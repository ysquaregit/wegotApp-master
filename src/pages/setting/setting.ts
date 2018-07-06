import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {AboutPage} from "../about/about";
import {SupportPage} from "../support/support";
import {EmailComposer} from "@ionic-native/email-composer";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  pushNotification: boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public emailComposer: EmailComposer) {
    console.log(this.pushNotification);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  goToContactUs() {
    this.navCtrl.push(SupportPage);
  }

  goToAbout() {
    this.navCtrl.push(AboutPage);
  }

  // notiToggle() {
  //   if (this.pushNotification = true) {
  //     this.pushNotification = false;
  //   }
  //   else {
  //     this.pushNotification = true;
  //   }
  // }

  email() {
    let email = {
      to: 'support@wegot.in',
      subject: 'Queries',
      body: 'Sent from WU2.0 android mobile app',
      isHtml: true
    };

    this.emailComposer.open(email);
  }

}
