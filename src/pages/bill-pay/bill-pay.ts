import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {MessageService} from '../../app/services/data.service';
import {Headers, Http, RequestOptions} from '@angular/http';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";
import {Storage} from "@ionic/storage";

import {Profile} from "../../app/shared/profile";


@Component({
  selector: 'page-bill-pay',
  templateUrl: 'bill-pay.html',
  providers: [AngularFireDatabase]
})

export class BillPayPage {

  profileData: FirebaseObjectObservable<Profile>
  apartid: number;
  data = [];
  // token: any;
token = this.navParams.get('token');

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              private messageService: MessageService,
              private http: Http) {
    // this.storage.get('token')
    //   .then(data => {
    //     this.token = data;
    //     console.log(data)
    //   });

    console.log(this.token);
    this.afAuth.authState.take(1).subscribe(data => {

      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {

        this.apartid = snapshot.apartId;
        // this.load(this.apartid, this.token);
        this.loadHist(this.apartid, this.token);
      });
    })
  }

  //Bill History

  loadHist(apartid, token) {
    return new Promise(resolve => {
      let header = new Headers();
      header.append('x-access-token', token);
      console.log(this.token);
      let options = new RequestOptions({headers: header});
      this.http.get('http://w2.venaqua.com:3001/api/auth/dat/bh/1/' + apartid, options)
      // this.http.get('http://54.229.208.9:4003/api/auth/dat/bh/1/' + apartid, options)

        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
          console.log(this.data);

          this.messageService.sendBHArray(this.data);
        });
    });
  }

  //Last three months cost chart

  // load(apartid, token) {
  //
  //   return new Promise(resolve => {
  //
  //     let header = new Headers();
  //     header.append('x-access-token', token);
  //     let options = new RequestOptions({headers: header});
  //     // this.http.get('http://w2.venaqua.com:3001/api/auth/dat/bh/1/' + apartid, options)
  //     this.http.get('http://54.229.208.9:4003/api/auth/dat/bh/1/' + apartid, options)
  //
  //
  //       .map(res => res.json())
  //       .subscribe(data => {
  //
  //         this.data = data;
  //         resolve(this.data);
  //         console.log(this.data);
  //         this.messageService.sendTMCChartArray(this.data);
  //       });
  //   });
  // }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillPayPage');
  }

}
