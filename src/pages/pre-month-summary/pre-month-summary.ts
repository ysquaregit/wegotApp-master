import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {MessageService} from "../../app/services/data.service";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {AngularFireAuth} from "angularfire2/auth";

import {Profile} from "../../app/shared/profile";
import {MonthChartComponent} from "../../components/month-chart/month-chart";
import {CustomerDayValue, CustomerPreMonthValue} from "../../app/shared/customerValues.model";
import {PreMonthChartComponent} from "../../components/pre-month-chart/pre-month-chart";

@Component({
  selector: 'page-pre-month-summary',
  templateUrl: 'pre-month-summary.html',
  providers: [AngularFireDatabase]
})

// Dummy Data

/*export class PreMonthSummaryPage {

  public customerPreMonthValue: CustomerPreMonthValue[] = [
    new CustomerPreMonthValue(1101, 'Kitchen', 456, 0),
    new CustomerPreMonthValue(1101, 'Bathroom 1', 1947, 0),
    // new CustomerPreMonthValue(1101, 'Bathroom 2', 85, 0),
    // new CustomerPreMonthValue(1101, 'Common Tap', 23, 0)
    // new CustomerPreMonthValue(1101, 'KIT', 1245, 0),
    // new CustomerPreMonthValue(1101, 'B1', 3478, 0),
    // new CustomerPreMonthValue(1101, 'B2', 2847, 0),
    // new CustomerPreMonthValue(1101, 'HOT', 865, 0)
    // new CustomerMonthValue(1102, 'Kitchen', 471, 0),
    // new CustomerMonthValue(1102, 'Bathroom 1', 597, 0),
    // new CustomerMonthValue(1102, 'Bathroom 2', 673, 0),
    // new CustomerMonthValue(1102, 'Common Tap', 252, 0)
  ];

  constructor(public popoverCtrl: PopoverController) {

  }*/

//Live Data

export class PreMonthSummaryPage {

  profileData: FirebaseObjectObservable<Profile>
  monthCompSumData: any[] = [];
  monthCompSumArray: any[] = [];
  apartid: number;
  compObject: {
    compName: string,
    compValue: number
  };
  data = [];
  token = this.navParams.get("token");
  prev_monthTotal = this.navParams.get("prev_monthTotal");

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public messageService: MessageService,
              public http: Http,
              public popoverCtrl: PopoverController) {

    console.log(this.prev_monthTotal);

    this.messageService.getauthToken().subscribe(message => {
      this.token = message.auth_token;
    });

    this.afAuth.authState.take(1).subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
        console.log(this.apartid);
        this.loadData(this.apartid, this.token);
        // this.loadChartData(this.apartid, this.token);

      });
    })
  }


  loadData(apartid, token) {

    return new Promise(resolve => {

      let header = new Headers();
      header.append('x-access-token', token);
      let options = new RequestOptions({headers: header});

      this.http.get('http://w2.venaqua.com:3001/api/auth/dat/pd/mcs/' + apartid, options)
      // this.http.get('http://54.229.208.9:4003/api/auth/dat/pd/mcs/' + apartid, options)


        .map(res => res.json()).subscribe(data => {
        console.log(data);
        this.data = data;
        resolve(this.data);
        this.monthCompSumArray = data.pmcs;

        for (let datapoint in this.monthCompSumArray) {
          this.compObject = ({
            compName: this.monthCompSumArray[datapoint].cust_name,
            compValue: this.monthCompSumArray[datapoint].month_total
          });
          this.monthCompSumData.push(this.compObject);
        }
      });
    });
  }

  // loadChartData(apartid, token) {
  //   let header = new Headers();
  //   header.append('x-access-token', token);
  //   let options = new RequestOptions({headers: header});
  //   return this.http.get('http://w2.venaqua.com:3001/api/auth/dat/pd/dct/' + apartid, options)
  //
  //     .map(res => res.json()).subscribe(data => {
  //       console.log(data);
  //       this.data = data;
  //       this.messageService.sendPreMonthTotalChart(this.data);
  //     });
  // }

  // presentPopover(myEvent, points) {
  //   console.log(points);
  //   let popover = this.popoverCtrl.create(PreMonthChartComponent);
  //   popover.present({
  //     ev: myEvent
  //   });
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreMonthSummaryPage');
  }

}
