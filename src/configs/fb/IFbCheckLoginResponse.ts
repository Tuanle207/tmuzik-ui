import { FbAuthStatus } from './FbAuthStatus';

export interface IFbCheckLoginResponse {
  status: FbAuthStatus;
  authResponse: {
    accessToken: string;
    expiresIn: number;
    reauthorize_required_in: number;
    signedRequest: string;
    userID: string;
  }
}