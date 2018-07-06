import {Component} from '@angular/core';
import * as myGlobals from '../../app/globals';
import {Subscription} from 'rxjs/Subscription';
import {NavController} from 'ionic-angular';
import {MessageService} from '../../app/services/data.service';
import {BillPayPage} from '../../pages/bill-pay/bill-pay';

@Component({
  selector: 'old-params',
  templateUrl: 'old-params.html'
})
export class OldParamsComponent {

  //Dummy data

  // prev_budget = 0;
  // prev_month_cost = 240;
  // prev_month_total = 2403;
  // prev_rp = 100;

  //Live data

  prev_budget = myGlobals.ven_prev_budget;
  prev_month_cost = myGlobals.ven_prev_month_cost;
  prev_month_total = myGlobals.ven_prev_month_total;
  prev_rp = myGlobals.ven_prev_rp;
  token = myGlobals.token;
  text: string;
  message: any;
  subscription: Subscription;

  constructor(private messageService: MessageService,
              public nav: NavController) {

    this.messageService.getauthToken().subscribe(message => {
      this.token = message.auth_token;
    });

    this.messageService.getven_prev_month_total().subscribe(message => {
      this.prev_month_total = message.ven_prev_month_total;
    });

    this.messageService.getven_prev_month_cost().subscribe(message => {
      this.prev_month_cost = message.ven_prev_month_cost;
    });

    this.messageService.getven_prev_budget().subscribe(message => {
      this.prev_budget = message.ven_prev_budget;
    });

    this.messageService.getven_prev_rp().subscribe(message => {
      this.prev_rp = message.ven_prev_rp;
    });
  }

  billsPage() {
    this.nav.push(BillPayPage, {billAmount: this.prev_month_cost, token: this.token});
  }

}
