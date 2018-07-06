import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";

import {AlterEmailPage} from "../alter-email/alter-email";
import {Profile} from "../../app/shared/profile";
import {VerifyEmailPage} from "../verify-email/verify-email";
import {AlterPasswordPage} from "../alter-password/alter-password";
import {DeleteAccountPage} from "../delete-account/delete-account";
import {ReAuthenticatePage} from "../re-authenticate/re-authenticate";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [AngularFireDatabase]
})
export class ProfilePage {

  token = this.navParams.get("token");
  profileData: FirebaseObjectObservable<Profile>
  apartid: any;
  apartName: any;
  blockName: any;
  siteName: any;
  email: string;
  createdTime: string;
  lastLoginTime: string;
  emailVerified: boolean;
  a: string;
  b: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              private afAuth: AngularFireAuth) {

    this.afAuth.authState.take(1).subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);

      this.emailVerified = data.emailVerified;

      if (this.emailVerified === false) {
        this.a = 'Not Verified';
        this.b = 'danger';
      }
      else {
        this.a = 'Verified';
        this.b = 'secondary';
      }

      this.email = data.email;
      this.createdTime = data.metadata.creationTime;
      this.lastLoginTime = data.metadata.lastSignInTime;

      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
        this.apartName = snapshot.apartName;
        this.blockName = snapshot.blockName;
        this.siteName = snapshot.siteName;
      });
    })
  }

  getColor() {
    return this.emailVerified === false ? 'red' : 'green';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  toVerifyEmail() {
    if(this.emailVerified === false) {
    this.navCtrl.push(VerifyEmailPage);
    }
    else {
      alert('Thank you, Email already verified');
      console.log('Email Verified');
    }
  }

  toAlterEmail() {
    this.navCtrl.push(AlterEmailPage);
  }

  toAlterPassword() {
    this.navCtrl.push(AlterPasswordPage, {token: this.token, email: this.email});
  }

  toDeleteAccount() {
    this.navCtrl.push(DeleteAccountPage, {apartid: this.apartid, token: this.token, email: this.email});

  }


}
