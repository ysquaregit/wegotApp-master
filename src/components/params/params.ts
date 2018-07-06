import {Component} from '@angular/core';
import * as myGlobals from '../../app/globals';
import {Subscription} from 'rxjs/Subscription';
import {MessageService} from '../../app/services/data.service';
import {NavController} from 'ionic-angular';

import {AlarmControlPage} from '../../pages/alarm-control/alarm-control';
import {BudgetPage} from '../../pages/budget/budget';
import {BillPayPage} from '../../pages/bill-pay/bill-pay';
import {ComponentSummaryPage} from '../../pages/component-summary/component-summary';
import {DaySummaryChartPage} from "../../pages/day-summary-chart/day-summary-chart";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'params',
  templateUrl: 'params.html'
})

export class ParamsComponent {

  //Dummy data

  // balancebudget = 25000;
  // cur_budget = 25000;
  // cur_cost = 875.80;
  // daytotal = 332;
  // month_total = 8758;
  // rp = 100;
  // alcount = 0;
  // current = 8758;
  // max = 25000;

  //Real data

  text: string;
  balancebudget = myGlobals.ven_balancebudget;
  cur_budget = myGlobals.ven_cur_budget;
  cur_cost = myGlobals.ven_cur_cost;
  daytotal = myGlobals.ven_dayTotal;
  month_total = myGlobals.ven_month_total;
  rp = myGlobals.ven_rp;
  alcount = myGlobals.ALCount;
  current = myGlobals.ven_month_total;
  max = myGlobals.ven_cur_budget;
  // token = myGlobals.token;
  token: any;
  lastUpdated: any = '10/01/2017 10:10 pm';
  message: any;
  subscription: Subscription;


  constructor(private messageService: MessageService,
              public storage: Storage,
              public nav: NavController) {
    console.log('Hello ParamsComponent Component');

    this.storage.get('token')
      .then(data => {
        this.token = data;
        console.log(data)
      });

    // this.messageService.getauthToken().subscribe(message => {
    //   this.token = message.auth_token;
    // });

    this.messageService.getDaytotal().subscribe(message => {
      this.daytotal = message.ven_dayTotal;
    });

    this.messageService.getMonthtotal().subscribe(message => {
      this.month_total = message.ven_month_total;
      this.current = message.ven_month_total;
    });

    this.messageService.getven_cur_cost().subscribe(message => {
      this.cur_cost = message.ven_cur_cost;
    });

    this.messageService.getven_cur_budget().subscribe(message => {
      this.cur_budget = message.ven_cur_budget;
      this.max = message.ven_cur_budget;
    });

    this.messageService.getven_balancebudget().subscribe(message => {
      this.balancebudget = message.ven_balancebudget;
    });

    this.messageService.getven_rp().subscribe(message => {
      this.rp = message.ven_rp;
    });

    this.messageService.getALCount().subscribe(message => {
      this.alcount = message.alarms;
    });
  }

  getColor() {
    return this.alcount === 0 ? '#40ACE2' : 'red';
  }

  alarmsPage() {
    this.nav.push(AlarmControlPage, {token: this.token});
  }

  budgetPage() {
    this.nav.push(BudgetPage, {budget: this.max, current: this.month_total, token: this.token});
  }

  billsPage() {
    this.nav.push(BillPayPage, {billAmount: 0});
  }

  compSummary() {
    this.nav.push(ComponentSummaryPage, {token: this.token, monthTotal: this.month_total});
  }

  dayCompSummary() {
    this.nav.push(DaySummaryChartPage, {token: this.token, dayTotal: this.daytotal});
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }


  getOverlayStyle() {
    let isSemi = false;
    let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

    return {
      'top': isSemi ? 'auto' : '50%',
      'bottom': isSemi ? '5%' : 'auto',
      'left': '50%',
      'transform': transform,
      '-moz-transform': transform,
      '-webkit-transform': transform,
      //'font-size': this.radius / 3.5 + 'px'
    };

  }


}
