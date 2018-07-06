import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {VerifyPhoneOtpPage} from "../verify-phone-otp/verify-phone-otp";
import {Profile} from "../../app/shared/profile";
import {User} from "../../app/shared/user";
import {AngularFireAuth} from "angularfire2/auth";
import {Http} from "@angular/http";
import {AngularFireDatabase} from "angularfire2/database";
import {SignupEmailPage} from "../signup-email/signup-email";
import {LoginPage} from "../login/login";

/**
 * Generated class for the SignupMobilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup-mobile',
  templateUrl: 'signup-mobile.html',
})
export class SignupMobilePage {
  user = {} as User;
  profile = {} as Profile;
  mobverify = '';
  name = '';
  password= '';
  aui= '';
  mobile= '';
  hsize= '';
  noofpeople= '';
  fname= '';
  lname= '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afauth: AngularFireAuth,public afDatabase: AngularFireDatabase,
              public loadingCtrl: LoadingController,
              public toast: ToastController,
              public alertCtrl: AlertController,
              public http: Http) {


      this.name =  this.navParams.get('email');
     this.password= this.navParams.get('pass');
      this.aui= this.navParams.get('uid')
      this.mobile= this.navParams.get('mobile')
      this.hsize= this.navParams.get('hsize')
      this.noofpeople =  this.navParams.get('noofpeople')
      this.fname=this.navParams.get('fname')
      this.lname=this.navParams.get('lname')




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupMobilePage');
  }


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  createProfile() {
    this.afauth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
    })
  }


  async verifymob(){
console.log('in')
    if(this.mobile === this.mobverify){
      console.log(this.mobverify.length)
      if(this.mobverify.length === 10){

        console.log('valid');
        // proceed with reg

        this.presentLoadingDefault();
        const result = await this.afauth.auth.createUserWithEmailAndPassword(this.name, this.password)
          .then(res => {
              console.log(res);


              this.http.post('http://w2.venaqua.com:3001/api2/auth/register', {
                // this.http.post('http://54.229.208.9:4003/api/auth/register', {

                name: this.name,
                password: this.password,
                aui: this.aui,
                mobile: this.mobile,
                hsize: this.hsize,
                noofpeople: this.noofpeople,
                fname:this.fname,
                lname:this.lname
              }).map(res => res.json()).subscribe(data => {
                console.log(data);
                if (data.success == true) {


                  this.presentLoadingDefault();
                  //this.createProfile();

                  //sending to verify phone OTP
                  this.navCtrl.setRoot(VerifyPhoneOtpPage, {
                    num: this.mobile,
                    name: this.name,
                    password: this.password,
                    aui: this.aui
                  });
                  this.toast.create({
                    message: 'OTP SMS sent!',
                    duration: 3000
                  }).present();
                } else {
                  alert(data.message);
                }
              });
            },
            err => {
              let msg;
              console.log(result);
              switch (err['code']) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY

                case "auth/email-already-in-use":
                {
                  msg = "The email address is already in use by another account";
                  this.navCtrl.push(LoginPage)
                }

                  break;

                case "auth/weak-password":{
                  msg = "The password must be 6 characters long or more";
                  this.navCtrl.push(LoginPage)
                }

                  break;

                case "auth/invalid-email":
                {
                  msg = "The email address is badly formatted";
                  this.navCtrl.push(LoginPage)
                }


                  break;

                case "auth/network-request-failed":
                  msg = "Please turn-on the internet connection";
                  break;
              }
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: msg,
                buttons: ['Ok']
              });
              alert.present();
            });





// signup endds

      }else{

        let alert = this.alertCtrl.create({
          title: 'Mobile Number Invalid',
          subTitle: 'Enter 10 Digit Mobile number.',
          buttons: ['Dismiss']
        });
        alert.present();

      }

    }else{


    }


  }

}
