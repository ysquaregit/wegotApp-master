import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from '@angular/http';
import {MessageService} from '../../app/services/data.service';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval'

import {Profile} from "../../app/shared/profile";
import {DaySummaryChartPage} from "../day-summary-chart/day-summary-chart";
import {CustomerDayValue} from '../../app/shared/customerValues.model';

@Component({
  selector: 'page-day-comp-summary',
  templateUrl: 'day-comp-summary.html',
  providers: [AngularFireDatabase]
})

//Dummy data

/*export class DayCompSummaryPage{
  private customerDayValue: CustomerDayValue[] = [
    new CustomerDayValue(1101, 'Kitchen', 82, 0),
    new CustomerDayValue(1101, 'Bathroom 1', 250, 0),
    // new CustomerDayValue(1101, 'Bathroom 2', 85, 0),
    // new CustomerDayValue(1101, 'Hot', 23, 0)
    // new CustomerDayValue(1102, 'Kitchen', 24, 0),
    // new CustomerDayValue(1102, 'Bathroom 1', 35, 0),
    // new CustomerDayValue(1102, 'Bathroom 2', 40, 0),
    // new CustomerDayValue(1102, 'Common Tap', 10, 0)
  ];

  constructor(public navCtrl: NavController) {}*/

//Live data

export class DayCompSummaryPage {

  token = this.navParams.get("token");
  profileData: FirebaseObjectObservable<Profile>
  apartid: number;
  dayCompSumData: any[] = [];
  dayCompSumArray: any[] = [];
  compObject: {
    compName: string,
    compValue: number
  };

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public messageService: MessageService,
              public http: Http,
              public loadingCtrl: LoadingController,) {
    this.afAuth.authState.take(1).subscribe(data => {

      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {

        this.apartid = snapshot.apartId;
        console.log(this.apartid);
        this.loadData(this.apartid, this.token);
      });
    })
  }


  loadData(apartid, token) {

    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});

    this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/dcs/' + apartid, options)
    // this.http.get('http://54.229.208.9:4003/api/auth/dat/cd/dcs/' + apartid, options)

      .map(res => res.json()).subscribe(data => {
      console.log(data);
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



  goToDaySummaryChart() {
    this.navCtrl.push(DaySummaryChartPage, {token: this.token});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DayCompSummaryPage');
  }

}
