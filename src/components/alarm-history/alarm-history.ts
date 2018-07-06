import {Component} from '@angular/core';
import {MessageService} from '../../app/services/data.service';

@Component({
  selector: 'alarm-history',
  templateUrl: 'alarm-history.html'
})

export class AlarmHistoryComponent {

  alarmHistory: any [] = [];
  alarmObject: {
    cust_name: string,
    currState: number,
    dt: string,
    state: any,
    alarm_type: any,
    activeAlarm: number;
  };
  alertColor: string;

  constructor(private messageService: MessageService) {

    console.log('Hello AlarmHistoryComponent Component');
    this.messageService.getMAHArray().subscribe(message => {
      console.log(message);
      for (let alarmPoint in message.maharray.ah) {

        // if (message.maharray.ah[alarmPoint].activeAlarm == 0) {
        if(message.maharray.ah == 'NDF' || message.maharray.ah[alarmPoint].alarm_type != 12) {
          console.log('No alarm history found');
        }
        else {
          let tempVar = message.maharray.ah[alarmPoint];
          this.alarmObject = ({
            cust_name: tempVar.cust_name,
            currState: tempVar.currState,
            activeAlarm: tempVar.activeAlarm,
            alarm_type: tempVar.alarm_type,
            state: tempVar.state,
            dt: tempVar.dt
          });
          this.leakageType();
          this.getState();
          this.alarmHistory.push(this.alarmObject);
          console.log(this.alarmHistory);
        }
      }
      //   else {
      //     console.log('No alarm history found');
      //   }
      // }
    });
  }

  getState() {
    if(this.alarmObject.state == 0) {
      this.alarmObject.state = 'stopped';
      this.alertColor = 'primary';
    }
    else {
      this.alarmObject.state = 'started';
      this.alertColor = 'danger';

    }
  }

  leakageType() {
    if (this.alarmObject.alarm_type == 12) {
      this.alarmObject.alarm_type = 'Leakage';
    }
    else {
      this.alarmObject.alarm_type = 'Open Tap';
    }
  }

}
