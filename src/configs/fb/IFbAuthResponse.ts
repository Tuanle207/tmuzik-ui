import { FbAuthStatus } from './FbAuthStatus';

export interface IFbAuthResponse {
  status: FbAuthStatus;
  authResponse: {
    accessToken: string;
    expiresIn: number;
    data_access_expiration_time: number;
    graphDomain: string;
    signedRequest: string;
    userID: string;
  }
}