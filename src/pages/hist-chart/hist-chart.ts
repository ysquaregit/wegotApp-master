import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { Platform  } from 'ionic-angular';
/**
 * Generated class for the HistChartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-hist-chart',
  templateUrl: 'hist-chart.html',
})
export class HistChartPage {



  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }



content = "test";
  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform) {

    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        this.navCtrl.pop();

      });
    });



    let myval = this.navParams.get('mts');
    console.log("yep " + myval);




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistChartPage');
  }

}
