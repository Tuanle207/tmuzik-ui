import { IFbAuthResponse } from './IFbAuthResponse';

export interface IFbUserInfoResponse {
  id: string;
  name: string;
  email: string;
  picture: {
    data: {
      height: number;
      width: number;
      is_silhouette: boolean;
      url: string;
    }
  }
}

export interface IFbAuthState {
  identity: IFbAuthResponse;
  userInfo: IFbUserInfoResponse;
}