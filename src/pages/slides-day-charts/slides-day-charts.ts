import {Component, ViewChild} from '@angular/core';
import {LoadingController, NavController, NavParams, Slides} from 'ionic-angular';

/**
 * Generated class for the SlidesDayChartsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-slides-day-charts',
  templateUrl: 'slides-day-charts.html',
})

export class SlidesDayChartsPage {

  @ViewChild('pageSlider') pageSlider: Slides;
  tabs: any = '0';

  mySlideOptions = {
    initialSlide: 1,
    loop: true
  };


  ngOnInit() {
    this.presentLoadingDefault();
  }

  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidesDayChartsPage');
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
}
