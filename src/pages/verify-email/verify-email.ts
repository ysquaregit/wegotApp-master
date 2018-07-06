import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import * as firebase from "firebase";

@Component({
  selector: 'page-verify-email',
  templateUrl: 'verify-email.html',
})
export class VerifyEmailPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,) {

  }

  verifyEmail() {
    let user = firebase.auth().currentUser;

    user.sendEmailVerification()

      .then(data => {
        this.successToast();
        this.navCtrl.pop();
        console.log(data);
        console.log('Verification Email Sent');
      })

      .catch(error => {
        console.log(error);
        alert('Error sending verification mail');
      })
  }

  successToast() {
    let toast = this.toastCtrl.create({
      message: 'Verification Email sent to your Email-id',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyEmailPage');
  }

}
