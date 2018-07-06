import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Profile} from "../../app/shared/profile";
import {User} from "../../app/shared/user";
import {Http} from "@angular/http";
import {SignupNamePage} from "../signup-name/signup-name";

/**
 * Generated class for the SignupUidPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup-uid',
  templateUrl: 'signup-uid.html',
})
export class SignupUidPage {
  profile = {} as Profile;
  user = {} as User;
  fno = ' ';
  uid = 'x';
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public http: Http) {

    this.uid = this.navParams.get('uid');
    if(this.uid != 'x'){
      this.checkautoUID()
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupUidPage');

  }




  moveNext(){
    console.log('Check the UID')


    if (!this.profile.uniqueId || !this.profile.uniqueId1) {


      let alert = this.alertCtrl.create({
        title: 'UID Error',
        subTitle: 'Enter UID in both the fields',
        buttons: ['Dismiss']
      });
      alert.present();


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
                }
              },
                {
                  text: 'Yes',
                  handler: () => {

                    // proceed
                    this.navCtrl.push(SignupNamePage,{uid:this.profile.uniqueId1});
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


          }
        });


      } else {


        let alert = this.alertCtrl.create({
          title: 'UID Error',
          subTitle: 'The UID entered dosent match',
          buttons: ['Dismiss']
        });
        alert.present();

      }


    }

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

  checkautoUID(){

this.presentLoadingDefault()
      // proceed

      this.http.post('http://w2.venaqua.com:3001/api2/fno', {
        // this.http.post('http://54.229.208.9:4003/api/auth/register', {

        aui: this.uid

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
              }
            },
              {
                text: 'Yes',
                handler: () => {
                  this.presentLoadingDefault()
                  // proceed
                  this.navCtrl.push(SignupNamePage,{uid:this.uid});
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


        }
      });




  }
}
