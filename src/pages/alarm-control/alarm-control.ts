import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, Platform} from 'ionic-angular';
import {MessageService} from '../../app/services/data.service';
import {Headers, Http, RequestOptions} from '@angular/http';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";

import {Profile} from "../../app/shared/profile";

@Component({
  selector: 'page-alarm-control',
  templateUrl: 'alarm-control.html',
  providers: [AngularFireDatabase]
})

export class AlarmControlPage {

  profileData: FirebaseObjectObservable<Profile>
  apartid: number;
  token = this.navParams.get("token");
  data = [];

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              private messageService: MessageService,
              public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              public loadingCtrl: LoadingController,
              // public alertCtrl: AlertController,
              // private platform: Platform
  ) {
    console.log(this.token);
    this.afAuth.authState.take(1).subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
        this.loadData(this.apartid, this.token);
        this.loadData1(this.apartid, this.token);

      });

    });

    //To push dummy scheduled notifications.

    /*  if (!this.platform.is('cordova')) {
        console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
        return;
      }

      this.platform.ready()
        .then((rdy)=>{
          this.localNotifications.on('click', (notification, state) =>{
            let json = JSON.parse(notification.data);

            let alert = this.alertCtrl.create({
              title: notification.title,
              subTitle: json.myData,
              buttons: ['Show Alarms']
            });
            alert.present();
          });

        });
    }

    scheduleNotification() {
      this.localNotifications.schedule({
        id: 1,
        title: 'Alert',
        sound: 'default',
        icon: 'assets/icon.png',
        text: 'Leakage on bathroom inlet',
        at: new Date(new Date().getTime() + 5 * 1000),
        data: {myData: 'Please check the bathroom inlet, Its a Leakage.'}
      });
    }*/
  }

  //To load active alarm control

  loadData(apartid, token) {

    return new Promise(resolve => {
      let header = new Headers();
      header.append('x-access-token', token);
      let options = new RequestOptions({headers: header});
      this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/aal/' + apartid, options)
      // this.http.get('http://54.229.208.9:4003/api/auth/dat/cd/aal/' + apartid, options)


        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
          console.log(this.data);

          this.messageService.sendAACArray(this.data);
        });
    });
  }

  //To load alarm history

  loadData1(apartid, token) {

    return new Promise(resolve => {
    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});
    this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/ah/' + apartid, options)
      // this.http.get('http://54.229.208.9:4003/api/auth/dat/cd/ah/' + apartid, options)


      .map(res => res.json())
      .subscribe(data => {

        this.data = data;
        resolve(this.data);
        console.log(this.data);

        this.messageService.sendMAHArray(this.data);
      });
    });
  }

  ionViewDidLoad() {
    this.presentLoadingDefault();
    console.log('ionViewDidLoad AlarmControlPage');
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: `Please wait...`
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }


}
