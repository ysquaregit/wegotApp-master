import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Profile} from "../../app/shared/profile";
import {SignupEmailPage} from "../signup-email/signup-email";

/**
 * Generated class for the SignupHousedetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup-housedetails',
  templateUrl: 'signup-housedetails.html',
})
export class SignupHousedetailsPage {
 uid = '';
 fname = '';
 lname = '';
 profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController ) {
 this.uid = this.navParams.get('uid');
 this.fname = this.navParams.get('fname');
 this.lname = this.navParams.get('lname');
 console.log(this.fname + '-' + this.uid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupHousedetailsPage');
  }


moveNext(){
  if (!this.profile.hsize || !this.profile.noofpeople) {
    let alert = this.alertCtrl.create({
      title: 'Data Missing',
      subTitle: 'Kindly provide the details to proceed',
      buttons: ['Dismiss']
    });
    alert.present();
  } else {

    this.navCtrl.push(SignupEmailPage,{uid:this.uid,fname:this.fname,lname:this.lname,hsize:this.profile.hsize,
      noofpeople:this.profile.noofpeople})

  }
}



}
