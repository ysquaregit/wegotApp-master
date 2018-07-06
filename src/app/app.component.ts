import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {ToastController} from "ionic-angular";
import {Subscription} from 'rxjs/Subscription';
import {StatusBar} from '@ionic-native/status-bar';

import {LoginPage} from "../pages/login/login";
import {MainOptionsPage} from "../pages/main-options/main-options";
import {AngularFireAuth} from "angularfire2/auth";
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = LoginPage;
  loader: any;

  constructor(public platform: Platform,
              public splashScreen: SplashScreen,
              public loadingCtrl: LoadingController,
              public storage: Storage,
              public toast: ToastController,) {

    // platform.ready().then(() => {
      // statusBar.styleDefault();
      // _SplashScreen.hide();
      // this.initializeApp();
    // });

    this.platform.ready()

      .then(data => {
        this.storage.get('value')
          .then(result => {
            this.splashScreen.hide();
            if (result) {
              this.rootPage = MainOptionsPage;
            }
            else {
              this.rootPage = LoginPage;
            }
          })
      })


    // this.presentLoading();


    // this.storage.set('introShown', true);

    // this.platform.ready().then(() => {
    //
    //   this.storage.get('introShown').then((result) => {
    //
    //     if(result){
    //
    //      // this.rootPage = MainOptionsPage;
    //       this.rootPage = LoginPage;
    //
    //     } else {
    //
    //       this.rootPage = WelcomeScreenPage;
    //       this.storage.set('introShown', true);
    //
    //     }
    //
    //     this.loader.dismiss();
    //   });
  }
  //
  // presentLoading() {
  //   this.loader = this.loadingCtrl.create({
  //     content: "Please wait..."
  //   });
  //
  //   this.loader.present();
  // }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.hideSplashScreen();
  //   });
  // }
  //
  // hideSplashScreen() {
  //   if (this._SplashScreen) {
  //     setTimeout(() => {
  //       this._SplashScreen.hide();
  //     }, 100);
  //   }
  // }

  //PUSH NOTIFICATION INIT ANDROID

  /*initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }

    const options: PushOptions = {
      android: {
        // senderID: '209072323696'
        senderID: '250568884173'
      },
      ios: {
        alert: 'true',
        badge: 'true',
        sound: 'true'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token -> ' + data.registrationId);
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('GOt message');
      console.log('message -> ' + data.message);

      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              // this.toAlarmPage();

              console.log('GOt message');
              //this.nav.push(DetailsPage, { message: data.message });
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        // this.nav.push(DetailsPage, { message: data.message });
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error =>
      console.error('Error with Push plugin' + error));
  }

  toAlarmPage() {
    this.nav.push(AlarmControlPage);
  }

  PUSH NOTIFICATION INIT ANDROID*/
}
