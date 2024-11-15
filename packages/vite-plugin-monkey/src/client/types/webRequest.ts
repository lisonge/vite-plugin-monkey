export interface GmWebRequestRule {
  selector:
    | string
    | {
        include?: string | string[];
        match?: string | string[];
        exclude?: string | string[];
      };
  action:
    | 'cancel'
    | {
        cancel?: boolean;
        redirect?:
          | string
          | {
              url: string;
              from?: string;
              to?: string;
            };
      };
}

export interface GmWebRequestListener {
  (
    info: 'cancel' | 'redirect',
    message: 'ok' | 'error',
    details: {
      rule: GmWebRequestRule;
      url: string;
      redirect_url: string;
      description: string;
    },
  ): void;
}

export interface GmWebRequestType {
  (rules: GmWebRequestRule[], listener: GmWebRequestListener): void;
}
