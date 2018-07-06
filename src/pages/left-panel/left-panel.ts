import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-left-panel',
  templateUrl: 'left-panel.html',
})

export class LeftPanelPage {

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public navParams: NavParams
  ) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad LeftPanelPage');
    this.presentLoadingDefault();
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait..'
    });
    loading.present();
    setTimeout(() => {

      loading.dismiss();
    }, 2000);
  }

}
