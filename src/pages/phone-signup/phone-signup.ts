import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {LoginPage} from "../login/login";
import {User} from "../../app/shared/user";
import {EmailSignupPage} from "../email-signup/email-signup";
import {VerifyPhoneOtpPage} from "../verify-phone-otp/verify-phone-otp";

/**
 * Generated class for the PhoneSignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-phone-signup',
  templateUrl: 'phone-signup.html',
  providers: [AngularFireAuth]
})

export class PhoneSignupPage {

  user = {} as User;

  constructor(
    public navCtrl: NavController,
    private afauth: AngularFireAuth,
    public toast: ToastController,
    // private qrScanner: QRScanner
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneSignupPage');
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  async signup(user: User) {
    try {
      const result = await this.afauth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.navCtrl.push(LoginPage);
      this.toast.create({
        message: 'Login Created.. please do login here..',
        duration: 3000
      }).present();

    }
    catch(e) {
      console.error(e);
        this.showAlert()
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Please enter valid email',
      buttons: ['OK']
    });
    alert.present();
  }

  sendOtp() {
    this.navCtrl.push(VerifyPhoneOtpPage);
  }

  emailsignup() {
    this.navCtrl.push(EmailSignupPage);
  }

  // scanqr(){
  //   this.options = {
  //     prompt : "Scan your barcode "
  //   }
  //   this.barcodeScanner.scan(this.options).then((barcodeData) => {
  //
  //     console.log(barcodeData);
  //     this.scanData = barcodeData;
  //   }, (err) => {
  //     console.log("Error occured : " + err);
  //   });
  // }

}
