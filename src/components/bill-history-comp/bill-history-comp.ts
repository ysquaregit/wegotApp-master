import {Component} from '@angular/core';
import {MessageService} from '../../app/services/data.service';

import {BillHistory} from "../../app/shared/customerValues.model";

@Component({
  selector: 'bill-history-comp',
  templateUrl: 'bill-history-comp.html'
})

//Dummy data

/*export class BillHistoryCompComponent {

  billHistory: BillHistory[] = [
    new BillHistory("11/11/2017", 514, "Paid"),
    new BillHistory("10/10/2017", 334, "paid"),
    new BillHistory("9/09/2017", 784, "paid"),
  ];
}*/

//Live data

export class BillHistoryCompComponent {

  billHistory: any [] = [];
  billObject: {
    month: string,
    amount: number,
    status: string
  };

  constructor(private messageService: MessageService) {
    console.log('Hello BillHistoryCompComponent Component');

    this.messageService.getBHtArray().subscribe(message => {

      console.log(message);
      for (let billPoint in message.bhdata.bh) {

        if (message.bhdata.bh == 'NDF') {
          console.log('NDF found');
          this.billObject = ({
            month: '',
            amount: 0,
            status: 'no data'
          });
        }
        else {

          let tempVar = message.bhdata.bh[billPoint];
          this.billObject = ({
            month: tempVar.dt,
            amount: tempVar.amount,
            status: tempVar.bill_status
          });
          this.getStatus();
          this.billHistory.push(this.billObject);
          console.log(this.billHistory);
        }
      }
    });
  }


  // Defining the badge status
  getStatus() {
    if (this.billObject.status == '1') {
      this.billObject.status = 'Paid';
    }
    else {
      this.billObject.status = 'Pending';
    }
  }

}
