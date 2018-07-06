import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";

import {LoginPage} from "../login/login";
import {User} from "../../app/shared/user";
import {EmailComposer} from "@ionic-native/email-composer";

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers: [AngularFireAuth]
})

export class ResetPasswordPage {

  user = {} as User;

  constructor(private afauth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams,
              public emailComposer: EmailComposer,
              public toast: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword() {
    let email = {
      to: 'support@wegot.in',
      subject: 'Request for reset my password',
      body: 'I request to reset my password and my account details are below,' +
      'Email-id: ' +
      'Name:' +
      'Apartment Unique-id:' +
      'Apartment name:' +
        'Site name:' +
        'Block name' +
      '-Sent from wu2.0 mobile app',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

  // async resetPassword(user: User) {
  //   const result = this.afauth.auth.sendPasswordResetEmail(user.email)
  //     .then(res => {
  //
  //       this.navCtrl.push(LoginPage);
  //       console.log(result);
  //       return this.toast.create({
  //
  //         message: 'Reset link have been sent to your Email',
  //         duration: 3000
  //       }).present();
  //     }, err => {
  //
  //       let msg;
  //       switch (err['code']) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY
  //
  //         case "auth/invalid-email":
  //           msg = "The email address is badly formatted.";
  //           break;
  //
  //         case "auth/user-not-found":
  //           msg = "There is no user record corresponding to this email address.";
  //           break;
  //
  //         case "auth/argument-error":
  //           msg = "Enter valid Email"
  //       }
  //     });
  // }

}
