import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController, ToastController} from 'ionic-angular';
import {MessageService} from '../../app/services/data.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";

import {Profile} from "../../app/shared/profile";
import {MonthChartComponent} from "../../components/month-chart/month-chart";
import {CustomerMonthValue} from '../../app/shared/customerValues.model';
import {MonthInletChartComponent} from "../../components/month-inlet-chart/month-inlet-chart";

@Component({
  selector: 'page-component-summary',
  templateUrl: 'component-summary.html',
  providers: [AngularFireDatabase]
})

//Dummy data

/*export class ComponentSummaryPage {
  public customerMonthValue: CustomerMonthValue[] = [
    new CustomerMonthValue(281700037, 'Kitchen', 3048, 0),
    new CustomerMonthValue(281700037, 'Bathroom 1', 5710, 0),
    // new CustomerMonthValue(281700037, 'Bathroom 2', 603, 0),
    // new CustomerMonthValue(281700037, 'HOT', 437, 0)
    // new CustomerMonthValue(1102, 'Kitchen', 471, 0),
    // new CustomerMonthValue(1102, 'Bathroom 1', 597, 0),
    // new CustomerMonthValue(1102, 'Bathroom 2', 673, 0),
    // new CustomerMonthValue(1102, 'Common Tap', 252, 0)
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController) {}*/

//Live data

export class ComponentSummaryPage {

  profileData: FirebaseObjectObservable<Profile>
  monthCompSumData: any[] = [];
  monthCompSumArray: any[] = [];
  apartid: any;
  compObject: {
    compName: string,
    compValue: number
  };
  monthTotal = this.navParams.get("monthTotal");
  token = this.navParams.get("token");
  data = [];


  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public messageService: MessageService,
              public http: Http,
              public popoverCtrl: PopoverController,
              private toastCtrl: ToastController) {

    this.afAuth.authState.take(1).subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
        console.log(this.apartid);
        // this.loadChartData1(this.apartid, this.token);
        // this.loadChartData(this.apartid, this.token);
        this.loadData(this.apartid, this.token);
      });

    })

  }

  loadData(apartid, token) {
    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});
    return this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/mcs/' + apartid, options)
    // return this.http.get('http://54.229.208.9:4003/api/auth/dat/cd/mcs/' + apartid, options)


      .map(res => res.json()).subscribe(data => {
        console.log(data);
        this.monthCompSumArray = data.mcs;

        for (let datapoint in this.monthCompSumArray) {
          this.compObject = ({
            compName: this.monthCompSumArray[datapoint].cust_name,
            compValue: this.monthCompSumArray[datapoint].month_total
          });
          this.monthCompSumData.push(this.compObject);
          console.log(this.monthCompSumData);
        }
      });
  }

  //Chart data

  // loadChartData(apartid, token) {
  //   let header = new Headers();
  //   header.append('x-access-token', token);
  //   let options = new RequestOptions({headers: header});
  //   return this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/dct/' + apartid, options)
  //
  //     .map(res => res.json()).subscribe(data => {
  //       console.log(data);
  //       this.data = data;
  //       console.log(this.data);
  //       this.messageService.sendMonthTotalChart(this.data);
  //     });
  // }

  // loadChartData1(apartid, token) {
  //   let header = new Headers();
  //   header.append('x-access-token', token);
  //   let options = new RequestOptions({headers: header});
  //   return this.http.get('http://w2.venaqua.com:3001/api/auth/dat/cd/dc/' + apartid, options)
  //
  //     .map(res => res.json()).subscribe(data => {
  //       console.log(data);
  //       this.data = data;
  //       console.log(this.data);
  //       this.messageService.sendMonthChartInletwise(this.data);
  //     });
  // }

  doRefresh(refresher) {
    this.monthCompSumData = [];
    this.monthCompSumArray = [];
    this.loadData(this.apartid, this.token);
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MonthInletChartComponent);
    popover.present({
      ev: myEvent
    });
  }

  dayWiseGraph() {
    console.log(`on-click on month summary graph success`);
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComponentSummaryPage');
  }

}
