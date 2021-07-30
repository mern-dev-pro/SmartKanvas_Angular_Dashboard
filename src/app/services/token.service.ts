import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from "firebase";
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  getToken() {
    return this.afAuth.idTokenResult
  }

}
