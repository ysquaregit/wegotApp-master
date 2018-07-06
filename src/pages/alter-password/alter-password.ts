import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import * as firebase from "firebase";

import {ProfilePage} from "../profile/profile";
import {Headers, Http, RequestOptions} from "@angular/http";
import {UpdatePassword} from "../../app/shared/update-password";
import {User} from "../../app/shared/user";

@Component({
  selector: 'page-alter-password',
  templateUrl: 'alter-password.html',
})

export class AlterPasswordPage {

  user = {} as User;
  updatePassword = {} as UpdatePassword;
  token = this.navParams.get("token");
  email = this.navParams.get("email");
  loading: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
  }

  reauthenticate(email, user: User) {
    const user1 = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      this.email, user.password
    );
    user1.reauthenticateWithCredential(credentials)

      .then(data => {
        console.log(data);
        this.presentLoadingDefault();
        this.changePassword(this.token, user, this.updatePassword);
      })
      .catch(error => {
        console.log(error);
        let msg;
        switch (error['code']) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY

          case "auth/wrong-password":
            msg = "Current password is incorrect";
            break;

          case "auth/too-many-requests":
            msg = "We have blocked all requests from this device due to unusual activity. Try again later.";
            break;

          case "auth/argument-error":
            msg = "Enter valid password";
            break;

        }
        alert(msg);
      });
  }

  //onclick on submit button.
  changePassword(token, user: User, updatePassword: UpdatePassword) {

    let user1 = firebase.auth().currentUser;
    user1.updatePassword(this.updatePassword.password)

      .then(data => {

        let header = new Headers();
        header.append('x-access-token', token);
        let options = new RequestOptions({headers: header});
        this.http.post('http://w2.venaqua.com:3001/api/auth/passup',
        // this.http.post('http://54.229.208.9:4003/api/auth/passup',
          {
            name: this.email,
            password: user.password,
            npassword: updatePassword.password
          }, options)

          .map(res => res.json()).subscribe(data => {

          if (data.success == true) {
            console.log(data);
            this.successToast();
            this.navCtrl.pop();
            console.log('Password Updated');
          }
          else {
            this.loading.dismiss();
            console.log(data);
            alert(data.message);
          }
        })
      })
      .catch(error => {
        this.loading.dismiss();
        console.log(error);
        let msg;
        switch (error['code']) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY

          case "auth/weak-password":
            msg = "New password must be 6 characters long or more";
            break;
        }
        alert(msg);
      });
  }

  presentLoadingDefault() {
     this.loading = this.loadingCtrl.create({
      content: 'Authenticating..'
    });
    this.loading.present();
  }

  //on success. Toast is displayed
  successToast() {
    this.loading.dismiss();
    let toast = this.toastCtrl.create({
      message: 'Password Updated Successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterPasswordPage');
  }

}
