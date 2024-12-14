import type { GmWebRequestRule } from './webRequest';

interface GmInfoResourceType {
  name: string;
  url: string;
  error: string;
  content: string;
  meta: string;
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
  injectInto: string;
  platform: {
    arch: 'arm' | 'mips' | 'mips64' | 'x86-32' | 'x86-64';
    browserName: string;
    browserVersion: string;
    os: 'android' | 'cros' | 'linux' | 'mac' | 'openbsd' | 'win';
  };
}

interface ViolentScriptType {
  namespace: string;
  name: string;
  author: string;
  description: string;
  icon: string;
  excludes: string[];
  includes: string[];
  matches: string[];
  resources: GmInfoResourceType[];
  version: string;
  noframes: boolean;
  unwrap: boolean;
  homepage: string;
  excludeMatches: string[];
  runAt: string;
  homepageURL: string;
  license: string;
  require: string[];
}

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_info
 */
interface TamperInfoType {
  container: {
    // 5.3+ | Firefox only
    id: string;
    name: string;
  };
  downloadMode: string;
  isFirstPartyIsolation: boolean;
  relaxedCsp: string;
  isIncognito: boolean;
  sandboxMode: 'js' | 'raw' | 'dom'; // 4.18+
  scriptHandler: string;
  scriptMetaStr: string;
  scriptUpdateURL: string;
  scriptWillUpdate: boolean;
  userAgentData: {
    brands: {
      brand: string;
      version: string;
    }[];
    mobile: boolean;
    platform: string;
    architecture: string;
    bitness: string;
  }; // 4.19+
  scriptSource: string;
}

interface TamperScriptType {
  antifeatures: { [antifeature: string]: { [locale: string]: string } };
  author: string;
  blockers: string[];
  connects: string[];
  copyright: string;
  deleted: number | undefined;
  description_i18n: { [locale: string]: string };
  description: string;
  downloadURL: string;
  excludes: string[];
  fileURL: string;
  grant: string[];
  header: string;
  homepage: string;
  icon: string;
  icon64: string;
  includes: string[];
  lastModified: number;
  matches: string[];
  name_i18n: { [locale: string]: string };
  name: string;
  namespace: string;
  position: number;
  resources: GmInfoResourceType[];
  supportURL: string;
  system: boolean;
  'run-at': string;
  'run-in': string[]; // 5.3+
  unwrap: boolean;
  updateURL: string;
  version: string;
  webRequest: GmWebRequestRule[];
  options: {
    check_for_updates: boolean;
    comment: string;
    compatopts_for_requires: boolean;
    compat_wrappedjsobject: boolean;
    compat_metadata: boolean;
    compat_foreach: boolean;
    compat_powerful_this: boolean;
    sandbox: string;
    noframes: boolean;
    unwrap: boolean;
    run_at: string;
    run_in: string; // 5.3+
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
      orig_run_at: string;
      orig_run_in: string[]; // 5.3+
      orig_noframes: boolean;
    };
  };
}

export interface GmInfoScriptType extends TamperScriptType, ViolentScriptType {}

/**
 * @see https://www.tampermonkey.net/documentation.php#api:GM_info
 * @see https://violentmonkey.github.io/api/gm/#gm_info
 */
export interface GmInfoType extends TamperInfoType, ViolentInfoType {
  script: GmInfoScriptType;
}
