import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  applyBase,
  localeFromLanguageTag,
  localeFromSitePath,
  localizeSitePath,
  removeBase,
  resolvePreferredLocale,
} from './language-preference.ts';

describe('language preference', () => {
  it('maps supported language tags to website locales', () => {
    assert.equal(localeFromLanguageTag('zh-CN'), 'zh');
    assert.equal(localeFromLanguageTag('zh-Hant'), 'zh');
    assert.equal(localeFromLanguageTag('en-US'), 'en');
    assert.equal(localeFromLanguageTag('fr-FR'), null);
  });

  it('prioritizes a stored choice over browser languages', () => {
    assert.equal(resolvePreferredLocale('en', ['zh-CN']), 'en');
    assert.equal(resolvePreferredLocale('zh', ['en-US']), 'zh');
  });

  it('uses the first supported browser language and falls back to English', () => {
    assert.equal(resolvePreferredLocale(null, ['fr-FR', 'zh-CN']), 'zh');
    assert.equal(resolvePreferredLocale('invalid', ['ja-JP']), 'en');
  });
});

describe('localized paths', () => {
  it('detects the locale from the site path', () => {
    assert.equal(localeFromSitePath('/'), 'en');
    assert.equal(localeFromSitePath('/guide/configuration'), 'en');
    assert.equal(localeFromSitePath('/zh/'), 'zh');
    assert.equal(localeFromSitePath('/zh/guide/configuration'), 'zh');
  });

  it('adds and removes the Chinese locale prefix', () => {
    assert.equal(localizeSitePath('/', 'zh'), '/zh/');
    assert.equal(
      localizeSitePath('/guide/configuration', 'zh'),
      '/zh/guide/configuration',
    );
    assert.equal(localizeSitePath('/zh/', 'en'), '/');
    assert.equal(
      localizeSitePath('/zh/guide/configuration', 'en'),
      '/guide/configuration',
    );
  });

  it('does not change paths that already use the target locale', () => {
    assert.equal(
      localizeSitePath('/guide/configuration', 'en'),
      '/guide/configuration',
    );
    assert.equal(
      localizeSitePath('/zh/guide/configuration', 'zh'),
      '/zh/guide/configuration',
    );
  });
});

describe('deployment base paths', () => {
  it('removes and reapplies a configured base', () => {
    assert.equal(
      removeBase(
        '/vite-plugin-monkey/guide/configuration',
        '/vite-plugin-monkey/',
      ),
      '/guide/configuration',
    );
    assert.equal(
      applyBase('/zh/guide/configuration', '/vite-plugin-monkey/'),
      '/vite-plugin-monkey/zh/guide/configuration',
    );
  });

  it('handles the base root and rejects unrelated paths', () => {
    assert.equal(
      removeBase('/guide/configuration', '/'),
      '/guide/configuration',
    );
    assert.equal(
      removeBase('/other/guide/configuration', '/vite-plugin-monkey/'),
      null,
    );
  });
});
