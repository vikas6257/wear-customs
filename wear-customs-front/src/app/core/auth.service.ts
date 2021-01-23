import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import * as firebaseui from 'firebaseui'
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null
  ui: any = null

  constructor(public afAuth: AngularFireAuth) {
    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();
    firebase.initializeApp(environment.firebaseConfig)
    this.afAuth.authState.subscribe(data => this.authState = data)
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
  }

  get authenticated(): boolean {
    return this.authState != null
  }

  get currentUserId(): string {
    return this.authenticated? this.authState: null
  }

  login() {
    this.ui.start('#Login_section', {
      signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Other config options...
    });
    // this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logout() {
    this.afAuth.signOut()
  }
}
