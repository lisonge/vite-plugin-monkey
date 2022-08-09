export type ViolentInfo = {
  uuid: string;
  injectInto: string;
  platform: ViolentPlatform;
};
type ViolentPlatform = {
  arch: 'arm' | 'mips' | 'mips64' | 'x86-32' | 'x86-64';
  browserName: string;
  browserVersion: string;
  os: 'android' | 'cros' | 'linux' | 'mac' | 'openbsd' | 'win';
};

export type ViolentScriptMeta = {
  excludeMatches: string[];
  runAt: string;
  homepageURL?: string;
  license: string;
  require: string[];
};
