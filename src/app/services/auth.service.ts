import { HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {
  private subjLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private apollo: Apollo, private router: Router) {}
    popup: any; 
  login(email, password) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation($email: String!, $password: String!) {
            createTokenPassword( email: $email, password: $password ) {
              accessToken
              refreshToken
              user {
                ID
                Email
                UserName
              }
            }
          }
        `,
        variables: {
          email,
          password,
        },
      })
      .pipe(map((res: any) => res.data.createTokenPassword));
  }

  loginWithGoogle(tokenNetwork) {
    return this.apollo
    .mutate({
      mutation: gql`
      mutation ($tokenNetwork: String!) {
        createTokenSocialNetwork(tokenNetwork: $tokenNetwork, socialNetwork: GOOGLE) {
          user {
            ID
            Email
            UserName
            Photo
          }
          accessToken
          refreshToken
        }
      }
      `,
      variables: {
        tokenNetwork,
      },
    })
    .pipe(map((res: any) => res.data.createTokenSocialNetwork));

  }

  setToken(token, refreshToken) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refreshToken);
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  isLogged(token: string): boolean {
    // tslint:disable-next-line: curly
    if (!token) token = this.getToken();
    // tslint:disable-next-line: curly
    if (!token) return false;
    // tslint:disable-next-line: curly
    if (!this.isTokenExpired()) return true;
  }

  isTokenExpired(token?: string): boolean {
    // tslint:disable-next-line: curly
    if (!token) token = this.getToken();
    // tslint:disable-next-line: curly
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    return !(date.valueOf() - 500 > new Date().valueOf());
  }

  getTokenExpirationDate(token: string): Date {

    const decoded = jwt_decode(token);
    // tslint:disable-next-line: curly
    if (decoded === undefined) return null;

    const date = new Date(0);
    // date.setUTCSeconds(decoded);

    return date;
  }

  logout(refreshToken, accessToken) {
    this.subjLoggedIn.next(false);
    return this.apollo.mutate({
      mutation: gql`
        mutation($refreshToken: String!, $accessToken: String!){
          destroyToken(refreshToken: $refreshToken, accessToken: $accessToken )
        }
      `,
      variables: {
        refreshToken, accessToken
      }
    });
  }

  updateToken(refreshToken) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($refreshToken: String!) {
          updateToken(refreshToken: $refreshToken) {
            token
            refreshToken
          }
        }
      `,
      variables: {
        refreshToken
      }
    });
  }

  tokenIsValid(token) {
    return this.apollo
      .query({
        query: gql`
          query($token: String!) {
            validToken(token: $token) {
              token
            }
          }
        `,
        variables: {
          token
        }
      })
      .pipe(
        map((res: any) => {
          this.subjLoggedIn.next(true);
          if (res.errors) {
            res.errors.map(err => {
              const msg = err.message;
              if (
                msg ===
                'Essa sessão já foi encerrada, por favor logue novamente.'
              ) {
                this.router.navigateByUrl('login');
                localStorage.clear();
              }
            });
          }
        })
      )
      .subscribe();
  }

  getURLWithQueryParams(base, params) {
    const query = Object
      .entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join('&')
    return `${base}?${query}`
  }

  linkedinLogin() {
    const LINKEDIN_SCOPE = 'r_liteprofile r_emailaddress'
    const LINKEDIN_RIDERECT = 'http://localhost:4200/linkedin/popup.html'
    const LINKEDIN_CLIENT_ID = '86cjos4brc4fws'
    const LINKEDIN_URL = this.getURLWithQueryParams('https://www.linkedin.com/oauth/v2/authorization', {
      response_type: "code",
      client_id: LINKEDIN_CLIENT_ID,
      redirect_uri: LINKEDIN_RIDERECT,
      scope: LINKEDIN_SCOPE,
      state: 'randomString'
    })

    const myWindow = window.open(LINKEDIN_URL, 'name', 'width=600,height=600');
    window.addEventListener("message", this.receiveLinkedInMessage, {capture: true});

   }

  

   receiveLinkedInMessage ({ origin, data }) {
    if(data) {
      console.log(data);
      fetch(`https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))&oauth2_access_token=${data['?code']}`).then((res: any) => {
        console.log(res);
      })
    }
  }
}
