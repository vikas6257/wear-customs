import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
  }
}
