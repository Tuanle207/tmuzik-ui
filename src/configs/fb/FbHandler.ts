import ENV from '../env';
import { IFbAuthResponse } from './IFbAuthResponse';
import { IFbCheckLoginResponse } from './IFbCheckLoginResponse';
import { IFbUserInfoResponse } from './IFbUserInfoResponse';

class FbHandler {

  initialize() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId      : ENV.fb.appId,
        cookie     : true,
        xfbml      : true,
        version    : ENV.fb.version
      });
        
      window.FB.AppEvents.logPageView();  
    };
  
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as any; 
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  getLoginStatusAsync(): Promise<IFbCheckLoginResponse> {
    return new Promise((resolve) => {
      window.FB.getLoginStatus((response: IFbCheckLoginResponse) => {
        resolve(response);
      });
    })
  }

  loginAsync(): Promise<IFbAuthResponse> {
    return new Promise((resolve) => {
      window.FB.login((response: IFbAuthResponse) => {
        resolve(response)
      }, {
        scope: 'public_profile,email'
      })
    }); 
  }

  getUserProfileAsync({userId, accessToken}: {userId: string; accessToken: string}): Promise<IFbUserInfoResponse> {
    return new Promise((resolve) => {
      window.FB.api(
        `https://graph.facebook.com/${userId}`, 
        'GET', 
        {
          fields: 'id,name,email,picture.width(720).height(720)',
          access_token: accessToken
        }, (response: IFbUserInfoResponse) => resolve(response)
      );
    });
  }

  logoutAsync() {
    return new Promise((resolve) => {
      window.FB.logout((response: any) => {
        resolve(response);
      });
    });
  }

}

export const fbHandler = new FbHandler();