import {Component, ViewChild} from '@angular/core';
import {AlertController, MenuController, NavController, NavParams, Platform, Slides} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval'
import {Headers, Http, RequestOptions} from '@angular/http';
import {MessageService} from '../../app/services/data.service';
import {LoadingController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import * as firebase from "firebase";

import {Profile} from "../../app/shared/profile";
import {AlarmControlPage} from "../alarm-control/alarm-control";
import {BillPayPage} from "../bill-pay/bill-pay";
import {SupportPage} from "../support/support";
import {SettingPage} from "../setting/setting";
import {ProfilePage} from "../profile/profile";
import {FCM} from "@ionic-native/fcm";
import {Storage} from "@ionic/storage";
import {MainOptionsPage} from "../main-options/main-options";

@Component({
  selector: 'page-swipe-tabs',
  templateUrl: 'swipe-tabs.html',
  providers: [AngularFireDatabase]
})

export class SwipeTabsPage {

  profileData: FirebaseObjectObservable<Profile>
  apartid: any;
  data = [];
  data1 = [];
  budget: number;
  rp: number;
  cpl: number;
  dayTotal: number;
  monthTotal: number;
  alarms: any;
  curCost: number;
  prev_budget: number;
  prev_rp: number;
  prev_cpl: number;
  prev_monthTotal: number;
  prev_month_cost: number;
  token = this.navParams.get("token");

  @ViewChild('pageSlider') pageSlider: Slides;
  tabs: any = '0';

  mySlideOptions = {
    initialSlide: 1,
    loop: true
  };

  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
  }

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public messageService: MessageService,
              public http: Http,
              public menuCtrl: MenuController,
              public platform: Platform,
              public storage: Storage,
              public fcm: FCM,
              public alertCtrl: AlertController) {
    this.afAuth.authState.take(1).subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
        this.loadData(this.apartid, this.token);
        this.loadData1(this.apartid, this.token);
      });
    })
  }

  loadData(apartid, token) {

    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});

    const URL = 'http://w2.venaqua.com:3001/api/auth/dat/cd/params/' + apartid;
    // const URL = 'http://54.229.208.9:4003/api/auth/dat/cd/params/' + apartid;

    // Observable.timer(0, 10000)
    Observable.timer(0, 10000);
      Observable.interval(5000)
      .flatMap(() => this.http.get(URL, options)
        .map(res => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')))
      .subscribe(data => {

        this.data = data;
        this.budget = this.data['params'][0].budget;
        // this.rp = this.data['params'][0].rp;
        this.rp = this.data['params'][0].estLitres;
        this.alarms = this.data['params'][0].alarms;
        this.cpl = this.data['params'][0].cpl;
        this.dayTotal = this.data['params'][0].dayTotal;
        this.monthTotal = this.data['params'][0].monthTotal;
        this.alarms = this.data['params'][0].alarms;
        // this.curCost = this.cpl * this.monthTotal;
        this.curCost = this.data['params']['0'].estCost;


        this.messageService.sendauthToken(this.token);
//params observables
        this.messageService.senddayTotal(this.dayTotal);
        this.messageService.sendMonthTotal(this.monthTotal);
        this.messageService.sendven_cur_cost(this.curCost);
        this.messageService.sendven_cur_budget(this.budget);
        this.messageService.sendven_balancebudget(this.budget);
        this.messageService.sendven_rp(this.rp);
        this.messageService.sendALCount(this.alarms);

// daychart observable
//         this.messageService.sendMDChartArray(data.daychart);
//         this.messageService.sendPMChartArray(data.prevMonChart);
//         this.messageService.sendMHChartArray(data.monthcomptotal);
      });
  }

  loadData1(apartid, token) {
    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});

    const URL = 'http://w2.venaqua.com:3001/api/auth/dat/pd/params/' + apartid;
    // const URL = 'http://54.229.208.9:4003/api/auth/dat/pd/params/' + apartid;

    // Observable.timer(0, 10000)
    Observable.timer(0, 10000);
    Observable.interval(5000)

      .flatMap(() => this.http.get(URL, options)
        .map(res => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')))
      .subscribe(data1 => {
        this.data1 = data1;
        this.prev_budget = this.data1['pparams'][0].budget;
        this.prev_rp = this.data1['pparams'][0].rp;
        this.prev_cpl = this.data1['pparams'][0].cpl;
        this.prev_monthTotal = this.data1['pparams'][0].monthTotal;
        // this.prev_month_cost = this.prev_cpl * this.prev_monthTotal;
        this.prev_month_cost = this.data1['pparams'][0].pre_bill;

        this.messageService.sendven_prev_budget(this.prev_budget);
        this.messageService.sendven_prev_rp(this.prev_rp);
        this.messageService.sendven_prev_month_cost(this.prev_month_cost);
        this.messageService.sendven_prev_month_total(this.prev_monthTotal);
      });
  }

  //Closes the nav-drawer
  toHome() {
    this.menuCtrl.close();
  }


  //Nav to alarms page
  toAlarms() {
    this.navCtrl.push(AlarmControlPage, {token: this.token});
  }

  //Nav to bill-pay page
  toBills() {
    this.navCtrl.push(BillPayPage, {token: this.token});
  }

  //Nav to support page
  toSupport() {
    this.navCtrl.push(SupportPage);
  }

  //Nav to profile page
  toProfile() {
    this.navCtrl.push(ProfilePage, {token: this.token});
  }

  //Nav to settings page
  toSettings() {
    this.navCtrl.push(SettingPage);
  }

  //Pop-up alert button to log-out
  toLogout() {
    this.showConfirm();
  }

  //on-click on log-out
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'WU 2.0',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.platform.exitApp();
            this.logOut();
            this.storage.remove('value');
            this.unsubscribe(this.apartid);
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

  //logout from firebase
  logOut() {
    firebase.auth().signOut()
      .then(data => {
        // Sign-out successful.
        console.log(`logout success`);
      })
      .catch(error => {
        // An error happened.
        console.log(`logout failed`, error);
        alert(`log-out failed. please try after sometime`);
      });
  }

  doRefresh(refresher) {
    this.loadData(this.apartid, this.token);
    this.loadData1(this.apartid, this.token);
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwipeTabsPage');
  }
}
