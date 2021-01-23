import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import { WindowService } from "../../core/window.service";
import { SharedModule } from "../shared.module";

export class PhoneNumber {
  contury: string;
  number: string;

  get e164() {
    const num = this.contury + this.number;
    return `+${num}`
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode: string;
  user: string

  constructor(private win: WindowService) { }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captchaDiv')
    this.windowRef.recaptchaVerifier.render()
  }

  sendOneTimePass() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber.e164;
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
