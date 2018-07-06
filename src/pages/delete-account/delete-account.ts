import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import * as firebase from "firebase";
import {FCM} from "@ionic-native/fcm";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Storage} from "@ionic/storage";

import {User} from "../../app/shared/user";

@Component({
  selector: 'page-delete-account',
  templateUrl: 'delete-account.html',
})

export class DeleteAccountPage {

  //object definition.
  user = {} as User;
  apartid = this.navParams.get("apartid");
  token = this.navParams.get("token");
  email = this.navParams.get("email");

  constructor(public navCtrl: NavController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public fcm: FCM,
              public storage: Storage,
              private http: Http,
              public platform: Platform,
              public navParams: NavParams) {
    console.log(this.email)
  }

  //onclick on submit button.
  deleteAccount(token, user: User) {
    let user1 = firebase.auth().currentUser;

    user1.delete()
      .then(data => {

        console.log(data);
        let header = new Headers();
        header.append('x-access-token', token);
        let options = new RequestOptions({headers: header});
        this.http.post('http://w2.venaqua.com:3001/api/auth/delusr',
        // this.http.post('http://54.229.208.9:4003/api/auth/delusr',

          {
            name: this.email,
            password: user.password,
          }, options)

          .map(res => res.json()).subscribe(data => {

          if (data.success == true) {

            // this.successToast();
            console.log(data);
            console.log('Account Deleted');
          }
          else {
            alert(data.message);
            console.log(data);
          }
        })
      })
      .catch(error => {
        console.log(error);
        alert('Error deleting account');
      })
  }

  //Success Toast

  /*successToast() {
    let toast = this.toastCtrl.create({
      message: 'Account Deleted. Please Sign-up to use our App',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }*/

  //on-click on log-out
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'WU 2.0',
      message: 'Do you want to delete the Account?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel: Account delete cancel')
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.deleteAccount(this.token, this.user);
            this.storage.remove('value');
            this.storage.remove('token');
            this.unsubscribe(this.apartid);
            console.log('OK: Account delete confirm');
            this.platform.exitApp();
          }
        }]
    });
    confirm.present();
  }

  //unsubscribe from topic
  unsubscribe(apartid) {
    this.fcm.unsubscribeFromTopic(this.apartid);
    console.log('unsubscribed from topic: ' +this.apartid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteAccountPage');
  }

}
