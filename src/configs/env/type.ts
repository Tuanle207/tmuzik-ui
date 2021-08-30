export interface IENV {
  env: EnvType;
  apiUrl: string;
  fb: {
    appId: string;
    version: string;
  };
  requestTimeout: number;
  enableLogger: boolean;
};

export enum EnvType {
  Development = 'Development',
  Deployment = 'Deployment',
}