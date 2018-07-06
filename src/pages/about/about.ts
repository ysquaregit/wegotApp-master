import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  goToFb() {
  alert(`You will go to wegot fb page now`);
  }

  goToTwitter() {
    alert(`You will go to wegot twitter page now`);

  }

}
