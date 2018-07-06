import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import * as firebase from "firebase";
import {UpdateEmail} from "../../app/shared/update-email";

import {ProfilePage} from "../profile/profile";

@Component({
  selector: 'page-alter-email',
  templateUrl: 'alter-email.html',
})


export class AlterEmailPage {

  updateEmail = {} as UpdateEmail;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {

  }

  changeEmail() {

    let user = firebase.auth().currentUser;
    user.updateEmail(this.updateEmail.email).then(data => {

      this.successToast();
      this.navCtrl.push(ProfilePage);
      console.log(data);
      console.log('Email Updated');
    })
      .catch(error => {
        let msg;
        switch (error['code']) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY

          case "auth/invalid-email":
            msg= "The email address is badly formatted.";
            break;

          case "auth/argument-error":
            msg= "Enter valid Email";
            break;

          case "auth/email-already-in-use":
            msg = "The email address is already in use by another account.";
            break;
        }
        alert(msg);
        console.log(error);
      });

  }

  successToast() {
    let toast = this.toastCtrl.create({
      message: 'Email Updated Sucessful',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterEmailPage');
  }

}
