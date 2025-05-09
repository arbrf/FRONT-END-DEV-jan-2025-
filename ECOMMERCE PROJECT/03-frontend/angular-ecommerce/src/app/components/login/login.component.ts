import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';
// login.component.ts
import OktaSignIn from '@okta/okta-signin-widget';

import myAppConfig from '../../config/my-app-config'; // ✅ correct

import { OKTA_AUTH } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  oktaSignin:any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth:OktaAuth ) {
    this.oktaSignin = new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myAppConfig.oidc.clientId,
      redirectUri: myAppConfig.oidc.redirectUri,

      authParams: {
        pkce: true,
        issuer: myAppConfig.oidc.issuer,
        scopes: myAppConfig.oidc.scopes,
      }
    });
    
   }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl(
      { el: '#okta-sign-in-widget' },
      (response: any) => {
        if (response.status === 'SUCCESS') {
         // this.oktaAuth.signInWithRedirect();
          this.oktaAuth.signInWithRedirect({ sessionToken: response.sessionToken });
        }
      },
      (error: any) => {
        throw error;
      }
    );
    

  }

}
