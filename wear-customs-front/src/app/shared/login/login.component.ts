import { Component, OnInit } from '@angular/core';
import { WindowService } from "../../core/window.service";
import { SharedModule } from "../shared.module";
import {FormControl, Validators} from '@angular/forms';
import { FirebaseService } from '../../firebase.service'

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

  constructor(private win: WindowService,
    private firebaseService: FirebaseService
  ) {
    this.verificationCode = '';
    this.user = ''
  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = this.firebaseService.getCaptchaVerifier()
    this.windowRef.recaptchaVerifier.render()
  }

  sendOneTimePass() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+91'+this.phoneNumber.value;
    this.firebaseService.signInWithPhoneNumber(num, appVerifier)
  }

  verifyOneTimePass() {
    this.windowRef.confirmationResult.confirm(this.verificationCode).then(result => {
      this.user = result.user;
      console.log(result.user);
    }).catch(error => console.log(error));
  }

}
