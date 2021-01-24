import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import { WindowService } from "../../core/window.service";
import { SharedModule } from "../shared.module";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  windowRef: any;
  phoneNumber = new FormControl('', [Validators.required,
                                     Validators.minLength(10),
                                     Validators.maxLength(10)]);
  verificationCode: string;
  user: string
  captchaVerified = false

  constructor(private win: WindowService) {
    this.verificationCode = '';
  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captchaDiv', {
      'callback': (responss) => {
        this.captchaVerified = true;
      }
    });
    this.windowRef.recaptchaVerifier.render()
  }

  sendOneTimePass() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+91'+this.phoneNumber.value;
    firebase.auth().signInWithPhoneNumber(num, appVerifier).then(result => {
      this.windowRef.confirmationResult = result;
    }).catch (error => console.log(error));
  }

  verifyOneTimePass() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then(result => {
      this.user = result.user;
    }).catch(error => console.log(error));
  }

}
