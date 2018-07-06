import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage'
import {AngularFireDatabase} from "angularfire2/database";
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {User} from "../../app/shared/user";
import {ResetPasswordPage} from "../reset-password/reset-password";
import {MainOptionsPage} from "../main-options/main-options";
import {EmailSignupPage} from "../email-signup/email-signup";
import {Profile} from "../../app/shared/profile";
import {HomePage} from "../home/home";
import {VerifyPhoneOtpPage} from "../verify-phone-otp/verify-phone-otp";
import {SignupUidPage} from "../signup-uid/signup-uid";
import {ScanpagePage} from "../scanpage/scanpage";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]
})

export class LoginPage {

  user = {} as User;
  profile = {} as Profile;
  token: any;
  apartid: any;
  apartName: any;
  blockName: any;
  siteName: any;
  siteAdress: any;

  constructor(private afauth: AngularFireAuth,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public afDatabase: AngularFireDatabase,
              public toast: ToastController,
              public http: Http,
              private storage: Storage,
              private qrScanner: QRScanner,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  //On-Click on login button.
  async login(user: User, profile: Profile) {

    const result = this.afauth.auth.signInWithEmailAndPassword(user.email, user.password)

      .then(res => {

          this.http.post('http://w2.venaqua.com:3001/api/auth/authenticate', {
          // this.http.post('http://54.229.208.9:4003/api/auth/authenticate', {

            name: user.email,
            password: user.password
          })
            .map(res => res.json()).subscribe(data => {

            if (data.success == true) {
              console.log(data.token);
              this.storage.set('token', data.token);
              this.storage.set('value', true);
              this.token = data.token;
              this.storeApartId(profile);
              this.tokenSplit(this.token);
              this.navCtrl.setRoot(HomePage, {token: data.token});
              console.log(res);

              this.toast.create({
                message: 'Login successful..',
                duration: 3000
              }).present();
            } else {
              alert(data.message);
            }
          });
        },
        error => {
        // console.log(error);
        //   alert(error.message);
          let msg;
          switch (error['code']) { // SWITCH THE CODE RETURNED TO SEE WHAT MESSAGE YOU'LL DISPLAY

            case "auth/wrong-password":
              msg = "Email or Password is wrong.";
              break;

            case "auth/user-not-found":
              msg = "User not found.";
              break;

            case "auth/invalid-email":
              msg = "Email or Password is wrong.";
              break;

            case "auth/argument-error":
              msg = "Enter valid Email and Password";
              break;

            case "auth/network-request-failed":
              msg = "Please turn-on the internet connection";
              break;

          }
          alert(msg);
        });
  }

  tokenSplit(token) {
    let delimeter = '.';
    let string = this.token;
    let splitted = string.split(delimeter);
    console.log(splitted[1]);
    console.log(atob(splitted[1]));
    let obj1 = atob(splitted[1]);
    let obj = JSON.parse(obj1);
    console.log(obj);
    console.log(obj.aid);
    this.apartid = obj.aid;
    this.apartName = obj.udat.apartName;
    this.blockName = obj.udat.blockName;
    this.siteName = obj.udat.siteName;
    this.siteAdress = obj.udat.siteAdress;
  }


  storeApartId(profile: Profile) {
    this.afauth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}/apartId`).set(this.apartid);
      this.afDatabase.object(`profile/${auth.uid}/apartName`).set(this.apartName);
      this.afDatabase.object(`profile/${auth.uid}/blockName`).set(this.blockName);
      this.afDatabase.object(`profile/${auth.uid}/siteName`).set(this.siteName);
      this.afDatabase.object(`profile/${auth.uid}/siteAdress`).set(this.siteAdress);
    })
  }


  createProfile() {
    this.afauth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
    })
  }

  //On-Click on sign-up button.
  signup() {
    this.navCtrl.push(SignupUidPage);
  }

  //On-Click on forgot-password-button.
  resetpassword(){


    this.navCtrl.push(ResetPasswordPage);
  }





  scan() {

   this.navCtrl.push(ScanpagePage)
  }




}
