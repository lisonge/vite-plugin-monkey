export type WebRequestRule = {
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
              from: string;
              to: string;
            };
      };
};
