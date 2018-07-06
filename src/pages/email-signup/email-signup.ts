import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {VerifyPhoneOtpPage} from "../verify-phone-otp/verify-phone-otp";

import {User} from "../../app/shared/user";
import {LoginPage} from "../login/login";
import {Profile} from "../../app/shared/profile";
import {Http} from "@angular/http";
import {Slides} from "ionic-angular";
import {FabButton} from "ionic-angular";
import {NetworkInterface} from '@ionic-native/network-interface';
import * as cryp from 'cryptico'

@Component({
  selector: 'page-email-signup',
  templateUrl: 'email-signup.html',
  providers: [AngularFireAuth]
})

export class EmailSignupPage {
  @ViewChild(Slides) slides: Slides;
  profile = {} as Profile;
  user = {} as User;
  verify = '';
  private fabRef;
  fno = ' ';
mobverify = '';

  constructor(public navCtrl: NavController,
              // public loadingCtrl: LoadingController,
              private afauth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              public toast: ToastController,
              // private qrScanner: QRScanner,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public http: Http,
              public element: ElementRef,
              private networkInterface: NetworkInterface) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailSignupPage');
    this.fabRef = this.element.nativeElement.getElementsByClassName("fab")[0];


    console.log(this.slides.getActiveIndex())
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
    }, 2000);
  }

  // verifyEmail(user: User) {
  //   this.afauth.auth.fetchProvidersForEmail(user.email);
  // }

  async signup(user: User, profile: Profile) {
    this.presentLoadingDefault();
    if (profile.uniqueId == profile.uniqueId1) {
      console.log('unique Id correct');
      console.log({
        name: user.email,
        password: user.password,
        aui: profile.uniqueId,
        mobile: profile.mobile,
        hsize: profile.hsize,
        noofpeople: profile.noofpeople
      });

    }
    else {
      alert("Your Unique Id doesn't match");
      console.log('wrong unique id');
    }

  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Please enter valid Email and Password',
      buttons: ['OK']
    });
    alert.present();
  }

  sendEmailVerify() {
    this.navCtrl.push(LoginPage);
  }

  emailsignup() {
    this.navCtrl.push(LoginPage);
  }

  createProfile() {
    this.afauth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
    })
  }

  // scanqr() {
  //   // Optionally request the permission early
  //   this.qrScanner.prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         // camera permission was granted
  //
  //
  //         // start scanning
  //         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
  //           console.log('Scanned something', text);
  //
  //           this.qrScanner.hide(); // hide camera preview
  //           scanSub.unsubscribe(); // stop scanning
  //         });
  //
  //         // show camera preview
  //         this.qrScanner.show();
  //
  //         // wait for user to scan something, then the observable callback will be called
  //
  //       } else if (status.denied) {
  //         // camera permission was permanently denied
  //         // you must use QRScanner.openSettings() method to guide the user to the settings page
  //         // then they can grant the permission from there
  //       } else {
  //         // permission was denied, but not permanently. You can ask for permission again at a later time.
  //       }
  //     })
  //     .catch((e: any) => console.log('Error is', e));
  // }


  next() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    let slideId = this.slides.getActiveIndex();

    if (slideId == 0) {

      console.log('Check the UID')

      if (this.profile.uniqueId == this.profile.uniqueId1) {
        this.slides.slideNext(800)
      } else {


        let alert = this.alertCtrl.create({
          title: 'UID Error',
          subTitle: 'The UID entered does not match',
          buttons: ['Dismiss']
        });
        alert.present();
      }

    } else if (slideId == 3) {
      console.log('Check password')

      if (this.user.password == this.verify) {
        this.slides.slideNext(800)
      } else {

        let alert = this.alertCtrl.create({
          title: 'Password Error',
          subTitle: 'The Passwords does not match',
          buttons: ['Dismiss']
        });
        alert.present();
      }


    }


  }


  swiping() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
    let slideId = this.slides.getActiveIndex();

    if (slideId == 1) {

      console.log('Check the UID')


      if (!this.profile.uniqueId || !this.profile.uniqueId1) {


        let alert = this.alertCtrl.create({
          title: 'UID Error',
          subTitle: 'Enter UID in both the fields',
          buttons: ['Dismiss']
        });
        alert.present();
        this.slides.slideTo(0)

      } else {

        if (this.profile.uniqueId == this.profile.uniqueId1) {

          // proceed

          this.http.post('http://w2.venaqua.com:3001/api2/fno', {
            // this.http.post('http://54.229.208.9:4003/api/auth/register', {

            aui: this.profile.uniqueId1

          }).map(res => res.json()).subscribe(data => {


            console.log(data.success);

            if (data.success == 'true') {
              console.log('inside')
              this.fno = data.apartCB.apartName;

              let alert2 = this.alertCtrl.create({
                title: 'Contact US',
                subTitle: 'Reach us at care@wegot.in. We will be happy to help.',
                buttons: ['Dismiss']
              });

              let alert = this.alertCtrl.create({
                title: 'Flat Number',
                subTitle: this.fno + ' is your flat number.',
                buttons: [{
                  text: 'No its wrong',
                  role: 'cancel',
                  handler: () => {
                    // let know the user to check the UID
                    alert2.present();
                    this.slides.slideTo(0)
                  }
                },
                  {
                    text: 'Yes',
                    handler: () => {

                      // proceed
                      this.slides.slideTo(1)
                    }
                  }
                ]
              });

              alert.present();

            } else if(data.success == 'false')  {
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'Error Occured, Try again later',
                buttons: ['Dismiss']
              });
              alert.present();
              this.slides.slideTo(0)

            }
          });


        } else {


          let alert = this.alertCtrl.create({
            title: 'UID Error',
            subTitle: 'The UID entered dosent match',
            buttons: ['Dismiss']
          });
          alert.present();
          this.slides.slideTo(0)
        }


      }

    } else if (slideId == 2) {
      if (!this.profile.firstName) {


        let alert = this.alertCtrl.create({
          title: 'Enter Name',
          subTitle: 'Enter Your Name to proceed',
          buttons: ['Dismiss']
        });
        alert.present();
        this.slides.slideTo(1)
      } else {

// proceed
      }


    } else if (slideId == 3) {

      if (!this.profile.hsize || !this.profile.noofpeople) {
        let alert = this.alertCtrl.create({
          title: 'Data Missing',
          subTitle: 'Kindly provide the details to proceed',
          buttons: ['Dismiss']
        });
        alert.present();
        this.slides.slideTo(2)
      } else {


      }


    } else if (slideId == 4) {

      if (!this.user.email || !this.user.password || this.verify) {


        let alert = this.alertCtrl.create({
          title: 'Data Missing',
          subTitle: 'Kindly provide the Email, password and verification to proceed',
          buttons: ['Dismiss']
        });
        alert.present();


      } else {

        //proceed

        if(this.user.password.length < 6){
          let alert = this.alertCtrl.create({
            title: 'Password Too short',
            subTitle: 'Minimum password length should be 6 charecters.',
            buttons: ['Ok']
          });
          alert.present();

        }else{
          // proceed
        }

          console.log('valid');

      }


    }
    if (this.slides.isEnd()) {
      console.log('enfd')
      this.fabRef.hidden = true;
    } else {
      this.fabRef.hidden = false;
    }


  }



  async verifymob(user: User, profile: Profile){
    if(this.profile.mobile === this.mobverify){
      console.log(this.mobverify.length)
      if(this.mobverify.length === 10){

        console.log('valid');
        // proceed with reg

        this.presentLoadingDefault();
        const result = await this.afauth.auth.createUserWithEmailAndPassword(user.email, user.password)
          .then(res => {
              console.log(res);


              this.http.post('http://w2.venaqua.com:3001/api2/auth/register', {
                // this.http.post('http://54.229.208.9:4003/api/auth/register', {

                name: user.email,
                password: user.password,
                aui: profile.uniqueId,
                mobile: profile.mobile,
                hsize: profile.hsize,
                noofpeople: profile.noofpeople
              }).map(res => res.json()).subscribe(data => {
                console.log(data);
                if (data.success == true) {


                  this.presentLoadingDefault();
                  this.createProfile();

                  //sending to verify phone OTP
                  this.navCtrl.setRoot(VerifyPhoneOtpPage, {
                    num: this.profile.mobile,
                    name: this.user.email,
                    password: this.user.password,
                    aui: this.profile.uniqueId
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
                  this.slides.slideTo(3);
                }

                  break;

                case "auth/weak-password":{
                  msg = "The password must be 6 characters long or more";
                  this.slides.slideTo(3);
                }

                  break;

                case "auth/invalid-email":
                {
                  msg = "The email address is badly formatted";
                  this.slides.slideTo(3);
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
