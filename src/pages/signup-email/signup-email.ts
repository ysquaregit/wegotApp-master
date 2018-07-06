import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {User} from "../../app/shared/user";
import {SignupMobilePage} from "../signup-mobile/signup-mobile";
import {Profile} from "../../app/shared/profile";

/**
 * Generated class for the SignupEmailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup-email',
  templateUrl: 'signup-email.html',
})
export class SignupEmailPage {
  user = {} as User;
  verify = '';
  email = '';
  password = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupEmailPage');
  }


  moveNext(){
    if (!this.email || !this.password || !this.verify) {


      let alert = this.alertCtrl.create({
        title: 'Data Missing',
        subTitle: 'Kindly provide the Email, password and verification to proceed',
        buttons: ['Dismiss']
      });
      alert.present();


    } else {

      //proceed
if(this.password === this.verify){

  if(this.password.length < 6){
    let alert = this.alertCtrl.create({
      title: 'Password Too short',
      subTitle: 'Minimum password length should be 6 charecters.',
      buttons: ['Ok']
    });
    alert.present();

  }else{
    console.log({uid:this.navParams.get('uid'),fname:this.navParams.get('fname'),
      lname:this.navParams.get('lname'),hsize:this.navParams.get('hsize'),
      noofpeople:this.navParams.get('noofpeople'),
      email:this.email,pass:this.password})
    // proceed
    this.navCtrl.push(SignupMobilePage,{uid:this.navParams.get('uid'),fname:this.navParams.get('fname'),
      lname:this.navParams.get('lname'),hsize:this.navParams.get('hsize'),
      noofpeople:this.navParams.get('noofpeople'),
      email:this.email,pass:this.password})
  }

}else{

  let alert = this.alertCtrl.create({
    title: 'Password Mismatch',
    subTitle: 'Passwords Mismatch',
    buttons: ['Ok']
  });
  alert.present();

}




    }
  }
}
