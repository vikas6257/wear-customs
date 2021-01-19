import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
// import { AngularFireModule } from "@angular/fire";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(data => this.authState = data)
  }

  get authenticated(): boolean {
    return this.authState != null
  }

  get currentUserId(): string {
    return this.authenticated? this.authState: null
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logout() {
    this.afAuth.signOut()
  }
}
