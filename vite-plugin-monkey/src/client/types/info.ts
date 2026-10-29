import type { GmWebRequestRule } from './webRequest.ts';

interface GmInfoResourceType {
  name: string;
  url: string;
  error?: string;
  content?: string;
  meta?: string;
}

/**
 * @see https://violentmonkey.github.io/api/gm/#gm_info
 */
interface ViolentInfoType {
  version: string;
  scriptHandler: string;
  scriptMetaStr: string;
  scriptSource: string;
  scriptUpdateURL: string;
  scriptWillUpdate: boolean;
  uuid: string;
  injectInto: 'auto' | 'page' | 'content';
  isIncognito: boolean;
  downloadMode: 'native' | 'browser';
  userAgent: string;
  userAgentData?: {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform: string;
    getHighEntropyValues(hints: string[]): Promise<{
      brands?: { brand: string; version: string }[];
      mobile?: boolean;
      platform?: string;
      architecture?: string;
      bitness?: string;
      model?: string;
      platformVersion?: string;
      fullVersionList?: { brand: string; version: string }[];
    }>;
  };
  platform: {
    arch:
      | 'aarch64'
      | 'arm'
      | 'arm64'
      | 'ppc64'
      | 's390x'
      | 'sparc64'
      | 'mips'
      | 'mips64'
      | 'x86-32'
      | 'x86-64';
    browserName: string;
    browserVersion: string;
    fullVersionList?: { brand: string; version: string }[];
    mobile?: boolean;
    os: 'android' | 'cros' | 'linux' | 'mac' | 'openbsd' | 'win' | 'fuchsia';
  };
}

interface ViolentScriptType {
  namespace: string;
  name: string;
  author?: string;
  description: string;
  icon?: string;
  excludes: string[];
  includes: string[];
  matches: string[];
  resources: GmInfoResourceType[];
  version: string;
  noframes?: boolean;
  unwrap?: boolean;
  homepage?: string;
  excludeMatches: string[];
  runAt: string;
  homepageURL?: string;
  license?: string;
  require: string[];
  antifeature?: string[];
  compatible?: string[];
  connect?: string[];
  grant: string[];
  downloadURL?: string;
  supportURL?: string;
  updateURL?: string;
  tags?: string[];
  options: {
    check_for_updates: boolean;
    inject_into: 'auto' | 'page' | 'content';
    noframes: boolean;
    run_at:
      | 'document-start'
      | 'document-body'
      | 'document-end'
      | 'document-idle';
    tags: string[];
    user_modified: number;
    override: {
      merge_exclude_matches: boolean;
      merge_excludes: boolean;
      merge_includes: boolean;
      merge_matches: boolean;
      merge_tags: boolean;
      use_exclude_matches: string[];
      use_excludes: string[];
      use_includes: string[];
      use_matches: string[];
    };
  };
}

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_info
 */
interface TamperInfoType {
  container?: {
    // 5.3+ | Firefox only
    id: string;
    name?: string;
  };
  downloadMode: string;
  isFirstPartyIsolation?: boolean;
  relaxedCsp?: string;
  isIncognito: boolean;
  sandboxMode: 'js' | 'raw' | 'dom'; // 4.18+
  scriptHandler: string;
  scriptMetaStr: string | null;
  scriptUpdateURL: string | null;
  scriptWillUpdate: boolean;
  userAgentData: {
    brands?: {
      brand: string;
      version: string;
    }[];
    mobile?: boolean;
    platform?: string;
    architecture?: string;
    bitness?: string;
  }; // 4.19+
  scriptSource?: string;
}

interface TamperScriptType {
  antifeatures: { [antifeature: string]: { [locale: string]: string } };
  author: string | null;
  blockers: string[];
  connects: string[];
  copyright: string | null;
  deleted?: number;
  description_i18n: { [locale: string]: string } | null;
  description: string;
  downloadURL: string | null;
  excludes: string[];
  fileURL: string | null;
  grant: string[];
  header: string | null;
  homepage: string | null;
  icon: string | null;
  icon64: string | null;
  includes: string[];
  lastModified: number;
  matches: string[];
  name_i18n: { [locale: string]: string } | null;
  name: string;
  namespace: string | null;
  position: number;
  resources: GmInfoResourceType[];
  supportURL: string | null;
  system?: boolean;
  'run-at': string | null;
  'run-in': string[] | null; // 5.3+
  unwrap: boolean | null;
  updateURL: string | null;
  version: string;
  webRequest: GmWebRequestRule[] | null;
  options: {
    check_for_updates: boolean;
    comment: string | null;
    compatopts_for_requires: boolean;
    compat_wrappedjsobject: boolean;
    compat_metadata: boolean;
    compat_foreach: boolean;
    compat_powerful_this: boolean | null;
    sandbox: string | null;
    noframes: boolean | null;
    unwrap: boolean | null;
    run_at: string | null;
    run_in: string | null; // 5.3+
    override: {
      use_includes: string[];
      orig_includes: string[];
      merge_includes: boolean;
      use_matches: string[];
      orig_matches: string[];
      merge_matches: boolean;
      use_excludes: string[];
      orig_excludes: string[];
      merge_excludes: boolean;
      use_connects: string[];
      orig_connects: string[];
      merge_connects: boolean;
      use_blockers: string[];
      orig_run_at: string | null;
      orig_run_in: string[] | null; // 5.3+
      orig_noframes: boolean | null;
    };
  };
}

export interface GmGreasemonkeyResourceType {
  name: string;
  mimetype: string;
  url: string;
}
export interface TampermonkeyInfo extends TamperInfoType {
  scriptHandler: 'Tampermonkey';
  version: string;
  script: TamperScriptType;
}
export interface ViolentmonkeyInfo extends ViolentInfoType {
  scriptHandler: 'Violentmonkey';
  script: ViolentScriptType;
}
export interface GreasemonkeyInfo {
  scriptHandler: 'Greasemonkey';
  version: string;
  scriptMetaStr: string;
  script: {
    uuid: string;
    name: string;
    namespace: string;
    description: string;
    version: string;
    includes: string[];
    excludes: string[];
    matches: string[];
    resources: Record<string, GmGreasemonkeyResourceType>;
  };
}
export type GmInfoType =
  | TampermonkeyInfo
  | ViolentmonkeyInfo
  | GreasemonkeyInfo;
export type GmInfoScriptType = GmInfoType['script'];
