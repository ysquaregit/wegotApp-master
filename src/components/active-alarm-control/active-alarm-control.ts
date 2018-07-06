import {Component} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {AlertController, NavParams} from 'ionic-angular';

import {MessageService} from '../../app/services/data.service';

@Component({
  selector: 'active-alarm-control',
  templateUrl: 'active-alarm-control.html'
})

export class ActiveAlarmControlComponent {
  disabled = false;
  toggleValue = false;
  text: string;

  //alarm object definition
  alarmObject: {
    compName: string,
    compID: string,
    currState: number,
    alarmType: any;
  };
  activeAlarm: any [] = [];
  token = this.navParams.get("token");

  constructor(private messageService: MessageService,
              public navParams: NavParams,
              private http: Http,
              public alertCtrl: AlertController) {


    console.log('Hello ActiveAlarmControlComponent Component');

    this.messageService.getAACArray().subscribe(message => {

      console.log(message);

      for (let alarmPoint in message.aacarray.aal) {
        // if (message.aacarray.aal[alarmPoint].currState == 1) {
        if (message.aacarray.aal == 'NDF' || message.aacarray.aal[alarmPoint].alarmType != 12) {
          console.log('no active alarms');
        }
        else {
          let tempVar = message.aacarray.aal[alarmPoint];
          this.alarmObject = ({
            compName: tempVar.compName,
            compID: tempVar.compID,
            currState: tempVar.currState,
            alarmType: tempVar.alarmType
          });
          this.leakageType();
          this.activeAlarm.push(this.alarmObject);
          console.log(this.activeAlarm);
        }
      }
      //   else {
      //     console.log('No active alarms found');
      //   }
      // }
    });

  }

  leakageType() {
    if (this.alarmObject.alarmType == 12) {
      this.alarmObject.alarmType = 'Leakage';
    }
    else {
      this.alarmObject.alarmType = 'Open Tap';
    }
  }

  //To turn off the valve


  turnOff(token, myevent) {
    this.disabled = true;
    console.log(myevent);
    console.log(this.token);
    this.turnOffHardware(token, myevent);
    this.turnOffAlert();
  }

  turnOffHardware(token, myevent) {
    let header = new Headers();
    header.append('x-access-token', token);
    let options = new RequestOptions({headers: header});
    console.log('http://w2.venaqua.com:3001/api/auth/ctrl/'+myevent+'/0');
    return this.http.get('http://w2.venaqua.com:3001/api/auth/ctrl/'+myevent+'/0', options)

      .subscribe(data => {
        console.log(data);
      });
  }

  turnOffAlert() {
    let alert = this.alertCtrl.create({
      title: 'Updated',
      subTitle: 'The component status has been changed. It may take few minutes to reflect.',
      buttons: ['OK']
    });
    alert.present();
  }

  //To turn off the valve

//   showAlert() {
//     let alert = this.alertCtrl.create({
//       title: 'Updated',
//       subTitle: 'The component status has been changed. It may take few minutes to reflect.',
//       buttons: ['OK']
//     });
//     alert.present();
//   }
//
//
// //you cracked it dude..! awesome .. keep up good work !
//   private toggleClicked(currentID, currentValue, sqlID) {
// if(currentValue == true)
// {
//   currentValue = 1;
// }
// else if(currentValue == false)
// {
//   currentValue = 0;
// }
//     console.log(currentID + currentValue + sqlID);
//     //send it to api   http://dev3.venaqua.com:8500/pc/ctrl?compID=ASE000020117&value=ON
//
//
//     const req = this.http.get('http://13.126.164.55/pc/ctrl?compID='+ currentID + '&value=' + currentValue + '&sqlID=' +sqlID);
//
//     req.subscribe();
//     this.showAlert();
//
//   }


}
