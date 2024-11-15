interface ViolentInfo {
  uuid: string;
  injectInto: string;
  platform: ViolentPlatform;
}

interface ViolentPlatform {
  arch: 'arm' | 'mips' | 'mips64' | 'x86-32' | 'x86-64';
  browserName: string;
  browserVersion: string;
  os: 'android' | 'cros' | 'linux' | 'mac' | 'openbsd' | 'win';
}

interface ViolentScriptMeta {
  excludeMatches: string[];
  runAt: string;
  homepageURL?: string;
  license: string;
  require: string[];
}

interface TamperInfo {
  downloadMode: 'native' | 'browser' | 'disabled';
  isIncognito: boolean;
  isFirstPartyIsolation?: boolean;
  scriptSource: string;
}

interface TamperScriptMeta {
  name_i18n: Record<string, string>;
  description_i18n: Record<string, string>;
  antifeatures: Record<string, Record<string, string>>;
  blockers: unknown[];
  'run-at': string;
  options: object;
  icon64?: string;
  sync: { imported: number };
  webRequest?: string[];
  requires: { textContent: string }[];
}

interface CommonScriptMeta {
  namespace: string;
  name: string;
  author?: string;
  description?: string;
  icon?: string;
  excludes: string[];
  includes: string[];
  matches: string[];
  resources: {
    name: string;
    url: string;
    content: string;
    meta: string;
  }[];
  runAt: string;
  version: string;
  noframes: boolean;
  unwrap: boolean;
  homepage: string;
}

interface ScriptMeta
  extends CommonScriptMeta,
    TamperScriptMeta,
    ViolentScriptMeta {}

interface CommonInfo {
  version: string;
  scriptHandler: string;
  scriptMetaStr: string;
  scriptSource: string;
  scriptUpdateURL?: string;
  scriptWillUpdate: boolean;
  script: ScriptMeta;
}

export interface GmInfoType extends CommonInfo, TamperInfo, ViolentInfo {}
