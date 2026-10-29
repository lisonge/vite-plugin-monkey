type GmAudioCallback = (error?: string) => void;

export interface GmAudioMuteDetails {
  isMuted: boolean;
}

export interface GmAudioMuteState {
  isMuted?: boolean;
  muteReason?: string;
  isAudible?: boolean;
}

export interface GmAudioStateChangeListener {
  (info: { muted?: string | false; audible?: boolean }): void;
}

export interface GmAudioType {
  setMute(details: GmAudioMuteDetails, callback?: GmAudioCallback): void;
  getState(callback: (state: GmAudioMuteState) => void): void;
  addStateChangeListener(
    listener: GmAudioStateChangeListener,
    callback?: GmAudioCallback,
  ): void;
  removeStateChangeListener(
    listener: GmAudioStateChangeListener,
    callback?: GmAudioCallback,
  ): void;
}

export interface GmAsyncAudioType {
  setMute(details: GmAudioMuteDetails): Promise<void>;
  getState(): Promise<GmAudioMuteState>;
  addStateChangeListener(listener: GmAudioStateChangeListener): Promise<void>;
  removeStateChangeListener(
    listener: GmAudioStateChangeListener,
  ): Promise<void>;
}
