import { Component } from '@angular/core';
import{ NavParams} from 'ionic-angular';
import {MessageService} from "../../app/services/data.service";

@Component({
  selector: 'bill-params',
  templateUrl: 'bill-params.html'
})

export class BillParamsComponent {

  prev_month_cost : number;
  text: string;

  constructor(private messageService: MessageService,
  ) {
    console.log('Hello BillParamsComponent Component');
    this.messageService.getven_prev_month_cost().subscribe(message => {
      this.prev_month_cost = message.ven_prev_month_cost;
    });
  }

  payButton() {
    alert('This feature is currently unavailable and will be updated soon !! :)');
  }
}
