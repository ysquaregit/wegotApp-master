import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner";
import {SignupUidPage} from "../signup-uid/signup-uid";

/**
 * Generated class for the ScanpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-scanpage',
  templateUrl: 'scanpage.html',
})
export class ScanpagePage {
  code = ''
showinstruction = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanpagePage');
  }



  scan() {
    this.showinstruction = 1
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted


          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);
            this.showCamera();
            this.code = text;
            this.navCtrl.push(SignupUidPage,{uid:this.code})
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }





  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }


  manual(){
    this.navCtrl.push(SignupUidPage);
  }

}
