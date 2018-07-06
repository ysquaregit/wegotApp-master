import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Headers, Http, RequestOptions} from "@angular/http";
import {ToastController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Profile} from "../../app/shared/profile";
import {AngularFireAuth} from "angularfire2/auth";
import {error} from "util";

@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
  providers: [AngularFireDatabase]
})

export class BudgetPage {

  profileData: FirebaseObjectObservable<Profile>
  apartid: number;
  current = this.navParams.get("current");
  max = this.navParams.get("budget");
  saturation: number = 0;
  token = this.navParams.get("token");
  percentVal = (((this.current - this.max) / this.max) * 100) + 100;
  precentValDeci = (this.percentVal).toFixed(0);

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              private toastCtrl: ToastController) {
    this.afAuth.authState.take(1).subscribe(data => {
      this.profileData = this.afDatabase.object(`profile/${data.uid}`);

      this.afDatabase.object(`profile/${data.uid}`, {preserveSnapshot: true});

      this.profileData.subscribe(snapshot => {
        this.apartid = snapshot.apartId;
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }

  //on-click on set budget button

  setBudget() {
    this.sendBudget(this.token, this.apartid, this.max);
    this.presentToast();
    this.navCtrl.pop();
    console.log('Budget set successful');
  }

  sendBudget(token, apartid, max) {
    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});
    return this.http.get('http://w2.venaqua.com:3001/api/auth/dat/set/budget/' + apartid + '/' + max, options)

      .subscribe(data => {
        console.log(data);
      });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Budget Updated!!',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  getOverlayStyle() {
    let isSemi = false;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      //'font-size': this.radius / 3.5 + 'px'
    };
  }

}
