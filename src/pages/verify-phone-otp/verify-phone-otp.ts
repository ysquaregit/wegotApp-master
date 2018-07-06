import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";
import {User} from "../../app/shared/user";
import {Http} from "@angular/http";


/**
 * Generated class for the VerifyPhoneOtpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-verify-phone-otp',
  templateUrl: 'verify-phone-otp.html',
  providers: [AngularFireAuth]
})
export class VerifyPhoneOtpPage {
  user = {} as User;



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toast: ToastController,
              public alertCtrl: AlertController,
              public http: Http) {

    this.user.mobile= navParams.get('num');
    this.user.password= navParams.get('password');
    this.user.email= navParams.get('name');



  }


chk(){
  let str = this.user.otp.toString();
  console.log(this.user.otp.toString())

  if(str.length === 6){
    this.verifyNum(this.user);
  }else{

  }

}

  verifyNum(user: User){
    console.log('sending OTP to check')
    console.log(this.user)
    this.http.post('http://w2.venaqua.com:3001/api2/auth/mverify?name='+user.email +'&password=' + user.password
    + '&mobile=' + user.mobile + '&otp=' + user.otp, {
      number: user.mobile,
      otp: user.otp
    }).map(res => res.json()).subscribe(data => {
      console.log(data);
      if (data.success == true) {

        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Your Registration is completed. Login here',
          buttons: ['OK']
        });
        alert.present();
        //sending to verify phone OTP
        this.navCtrl.setRoot(LoginPage);

      } else {
        alert(data.message);
      }
    });
  }

}
