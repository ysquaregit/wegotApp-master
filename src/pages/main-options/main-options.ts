import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {FirebaseObjectObservable, AngularFireDatabase} from "angularfire2/database-deprecated";
import {Profile} from "../../app/shared/profile";
import {AngularFireAuth} from "angularfire2/auth";
import {FCM} from '@ionic-native/fcm';
import * as firebase from "firebase";

import {SwipeTabsPage} from '../swipe-tabs/swipe-tabs';
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-main-options',
  templateUrl: 'main-options.html',
  providers: [AngularFireDatabase]
})

export class MainOptionsPage {

  profileData: FirebaseObjectObservable<Profile>
  data = [];
  apartid: any;
  ven_liters: number;
  created: string;
  // token = this.navParams.get("token");
  token: any;

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public storage: Storage,
              public fcm: FCM) {
    this.storage.get('token')
      .then(data => {
        this.token = data;
        console.log(data)
      });

    this.afAuth.authState.take(1).subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
        console.log(this.apartid);
        this.loadData(this.apartid, this.token);
        this.subscribe(this.apartid);
      });
    });
    this.auths();
  }

  auths() {
    let user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      console.log(user);
      console.log('user is signed in');
    } else {
      // No user is signed in.
      console.log(user);
      console.log('user is signed out');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainOptionsPage');
    this.presentLoadingDefault();

  }

  loadData(apartid, token) {

    return new Promise(resolve => {

      let header = new Headers();
      header.append('x-access-token', token);
      let options = new RequestOptions({headers: header});
      this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/params/' + apartid, options)

        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
          this.ven_liters = this.data['params'][0].monthTotal;
          this.goToHome()
        });
    });
  }

  //On-click on subscribe button
  subscribe(apartid) {
    this.fcm.subscribeToTopic(this.apartid);
    console.log('subscribed to topic: ' + this.apartid);
  }

  //On-Click on venaqua card.
  goToHome() {
    this.navCtrl.setRoot(HomePage, {token: this.token});
    this.presentLoadingDefault();
  }

  // clickDp() {
  //   this.dpAlert()
  // }

  //On-Click on display picture.
  // async takePhoto() {
  //
  //   //Defining camera options
  //   const options: CameraOptions = {
  //     quality: 50,
  //     targetHeight: 600,
  //     targetWidth: 600,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };
  //   const result = await this.camera.getPicture(options);
  //   const image = `data:image/jpeg;base64, ${result}`;
  //   this.afAuth.authState.take(1).subscribe(data => {
  //     const pictures = firebase.storage().ref(`profile/${data.uid}/dp`);
  //     pictures.putString(image, 'data_url');
  //   });
  //
  // }
  //
  // catch(e) {
  //   console.error(e);
  // }
  //
  // dpAlert() {
  //   let alert = this.alertCtrl.create();
  //   alert.setTitle('Select Photo');
  //
  //   alert.addButton({
  //     text: 'Click a Photo',
  //     handler: data => {
  //       this.takePhoto();
  //       console.log('Camera will be opened');
  //     }
  //   });
  //
  //   alert.addButton({
  //     text: 'Select from Gallery',
  //     handler: data => {
  //       console.log('Gallery will be opened');
  //     }
  //   });
  //   alert.present();
  // }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait..'
    });
    loading.present();
    setTimeout(() => {

      loading.dismiss();
    }, 3000);
  }

}
