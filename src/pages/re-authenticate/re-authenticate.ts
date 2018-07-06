import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../app/shared/user";
import * as firebase from "firebase";
import {Http} from "@angular/http";
import {AlterPasswordPage} from "../alter-password/alter-password";

@Component({
  selector: 'page-re-authenticate',
  templateUrl: 're-authenticate.html',
})
export class ReAuthenticatePage {

  user = {} as User;
  email = this.navParams.get("email");
  token = this.navParams.get("token");

  constructor(public navCtrl: NavController,
              public toast: ToastController,
              public http: Http,
              public navParams: NavParams) {
  }

  reauthenticate(email, user: User) {
    const user1 = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      this.email, user.password
    );
      user1.reauthenticateWithCredential(credentials)

      .then(data => {
        this.navCtrl.push(AlterPasswordPage, {token: this.token, email: this.email});
        console.log(data);
      })
      .catch(error => {
        console.log(error);
        let msg;
        switch (error['code']) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY

          case "auth/wrong-password":
            msg = "Incorrect password";
            break;
        }
        alert(msg);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReAuthenticatePage');
  }

}
