import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Headers, Http, RequestOptions} from "@angular/http";
import {MessageService} from "../../app/services/data.service";

import {Profile} from "../../app/shared/profile";


@Component({
  selector: 'page-day-summary-chart',
  templateUrl: 'day-summary-chart.html',
  providers: [AngularFireDatabase]

})
export class DaySummaryChartPage {

  profileData: FirebaseObjectObservable<Profile>
  token = this.navParams.get("token");
  apartid: number;
  dayCompSumData: any[] = [];
  dayCompSumArray: any[] = [];
  compObject: {
    compName: string,
    compValue: number
  };
  dayTotal: any;

  constructor(public navCtrl: NavController,
              private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              private messageService: MessageService,
              public http: Http,
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {

    this.afAuth.authState.take(1).subscribe(data => {

      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
        console.log(this.apartid);
        this.loadData(this.apartid, this.token);

        //To load chart data

        // this.loadData1(this.apartid, this.token);
      });
    })
  }

  //To load day component data

  loadData(apartid, token) {

    this.messageService.getDaytotal().subscribe(message => {
      this.dayTotal = message.ven_dayTotal;
    });

    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});

    this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/dcs/' + apartid, options)
    // this.http.get('http://54.229.208.9:4003/api/auth/dat/cd/dcs/' + apartid, options)

  .map(res => res.json()).subscribe(data => {
      console.log(data);
      // this.messageService.sendDayCompSummary(data);
      this.dayCompSumArray = data.dcs;

      for (let datapoint in this.dayCompSumArray) {
        this.compObject = ({
          compName: this.dayCompSumArray[datapoint].cust_name,
          compValue: this.dayCompSumArray[datapoint].day_total
        });
        this.dayCompSumData.push(this.compObject);
      }
    });
  }

  //To load chart data

  /*loadData1(apartid, token) {

    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});

    this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/dct/' + apartid, options)

      .map(res => res.json()).subscribe(data => {
      console.log(data);
      this.messageService.sendMonthTotalChart(data);
    })
  }*/


  doRefresh(refresher) {
    this.dayCompSumData = [];
    this.dayCompSumArray = [];
    this.loadData(this.apartid, this.token);
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaySummaryChartPage');
    this.presentLoadingDefault();

  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: `Please wait...`
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

}
