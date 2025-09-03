import type { GmAnyFuntion, GmVoidCallback } from './_share';

export interface GmAudioMuteDetails {
  isMuted: boolean;
}

export interface GmAudioMuteState {
  isMuted: boolean;
  muteReason: string;
  isAudible: boolean;
}

export interface GmAudioStateChangeListener {
  (info: { muted: string; audible: boolean }): void;
}

export interface GmAudioType {
  setMute(details: GmAudioMuteDetails, callback: GmVoidCallback): void;
  getMute(callback: (state: GmAudioMuteState) => void): void;
  addStateChangeListener(
    listener: GmAudioStateChangeListener,
    callback: GmVoidCallback,
  ): void;
  removeStateChangeListener(
    listener: GmAnyFuntion,
    callback: GmVoidCallback,
  ): void;
}

export interface GmAsyncAudioType {
  setMute(details: GmAudioMuteDetails): Promise<void>;
  getMute(): Promise<GmAudioMuteState>;
  addStateChangeListener(listener: GmAudioStateChangeListener): Promise<void>;
  removeStateChangeListener(listener: GmAnyFuntion): Promise<void>;
}
