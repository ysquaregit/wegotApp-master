import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {SignupHousedetailsPage} from "../signup-housedetails/signup-housedetails";
import {Profile} from "../../app/shared/profile";

/**
 * Generated class for the SignupNamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup-name',
  templateUrl: 'signup-name.html',
})
export class SignupNamePage {
  profile = {} as Profile;
  uid ='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

  this.uid = this.navParams.get('uid');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupNamePage');
  }




  moveNext(){

    if (!this.profile.firstName ||!this.profile.lastName ) {

      let alert = this.alertCtrl.create({
        title: 'Enter Name',
        subTitle: 'Enter Your First and Last Name to proceed',
        buttons: ['Dismiss']
      });
      alert.present();

    } else {

      // proceed
      this.navCtrl.push(SignupHousedetailsPage,{uid:this.uid,fname:this.profile.firstName,lname:this.profile.lastName})

    }







  }

}
