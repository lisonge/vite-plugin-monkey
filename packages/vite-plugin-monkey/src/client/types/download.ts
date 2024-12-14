import type {
  GmAbortHandle,
  GmProgressEventBase,
  GmReponseEventListener,
} from './_share';
import type { GmResponseEvent } from './xmlhttpRequest';

export interface GmDownloadErrorEvent {
  /**
   * Error reason
   * - `not_enabled` - the download feature isn't enabled by the user
   * - `not_whitelisted` - the requested file extension is not
   * whitelisted
   * - `not_permitted` - the user enabled the download feature, but did
   * not give the downloads permission
   * - `not_supported` - the download feature isn't supported by the
   * browser/version
   * - `not_succeeded` - the download wasn't started or failed, the
   * details attribute may provide more information
   */
  error:
    | 'not_enabled'
    | 'not_whitelisted'
    | 'not_permitted'
    | 'not_supported'
    | 'not_succeeded';

  details?: string;
}

export interface GmDownloadProgressEvent extends GmProgressEventBase {
  readonly finalUrl: string;
}

export interface GmDownloadOptions {
  /**
   * URL from where the data should be downloaded
   */
  url: string;
  /**
   * Filename - for security reasons the file extension needs to be
   * whitelisted at Tampermonkey options page
   */
  name: string;
  headers?: Record<string, string>;
  /**
   * Show 'Save As' dialog
   */
  saveAs?: boolean;
  /**
   * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/FilenameConflictAction
   */
  conflictAction?: 'uniquify' | 'overwrite' | 'prompt';
  timeout?: number;
  onerror?: GmReponseEventListener<GmDownloadErrorEvent>;
  ontimeout?(): void;
  onload?(): void;
  onprogress?: GmReponseEventListener<GmDownloadProgressEvent>;
}

export interface GmDownloadType {
  (options: GmDownloadOptions): GmAbortHandle<boolean>;
  (url: string, name?: string): GmAbortHandle<boolean>;
}
export interface GmDownloadAsyncAbortHandle
  extends Promise<GmResponseEvent<'blob', undefined>>,
    GmAbortHandle<boolean> {}

export interface GmAsyncDownloadType {
  (options: GmDownloadOptions): GmDownloadAsyncAbortHandle;
  (url: string, name?: string): GmDownloadAsyncAbortHandle;
}
