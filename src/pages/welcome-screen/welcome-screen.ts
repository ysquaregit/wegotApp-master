import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SwipeTabsPage} from '../swipe-tabs/swipe-tabs';
import {HomePage} from '../home/home';
import {MainOptionsPage} from '../main-options/main-options';
/**
 * Generated class for the WelcomeScreenPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome-screen',
  templateUrl: 'welcome-screen.html',
})



export class WelcomeScreenPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomeScreenPage');
  }

  goToHome(){
    this.navCtrl.setRoot(MainOptionsPage);
  }

}
