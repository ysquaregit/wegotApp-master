import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Profile} from "../../app/shared/profile";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the SupportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
  providers: [AngularFireDatabase]
})
export class SupportPage {

  profileData : FirebaseObjectObservable<Profile>
  apartid: number;
  email: string;
  createdTime: string;
  lastLoginTime: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afDatabase: AngularFireDatabase,
              private afAuth: AngularFireAuth
  ) {

    this.afAuth.authState.take(1).subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);

      this.email = data.email;
      this.createdTime  = data.metadata.creationTime;
      this.lastLoginTime = data.metadata.lastSignInTime;

      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
        console.log(this.apartid);

      });

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
  }

}
