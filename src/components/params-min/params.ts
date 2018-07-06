import { Component } from '@angular/core';
import * as myGlobals from '../../app/globals';
import { Subscription } from 'rxjs/Subscription';
import { MessageService } from '../../app/services/data.service';
import { NavController } from 'ionic-angular';
import { AlarmControlPage } from '../../pages/alarm-control/alarm-control';
import { BudgetPage} from '../../pages/budget/budget';
import { BillPayPage} from '../../pages/bill-pay/bill-pay';
import { ComponentSummaryPage} from '../../pages/component-summary/component-summary';
import { DayCompSummaryPage } from '../../pages/day-comp-summary/day-comp-summary';

@Component({
  selector: 'params-min',
  templateUrl: 'params.html'
})
export class ParamsMinComponent {
apartID:Number = 1;
  text: string;
  balancebudget = myGlobals.ven_balancebudget;
  cur_budget = myGlobals.ven_cur_budget;
  cur_cost = myGlobals.ven_cur_cost;
  daytotal = myGlobals.ven_dayTotal;
  month_total = myGlobals.ven_month_total;
  rp = myGlobals.ven_rp;
  current = 200;
  max = 1000;

  message: any;
  subscription: Subscription;


  constructor(private messageService: MessageService,public nav:NavController) {
    console.log('Hello ParamsComponent Component');
    this.text = 'Hello World';


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


  }


  alarmsPage()
  {

    this.nav.push(AlarmControlPage, {apartID:this.apartID});
  }



  budgetPage()
  {

    this.nav.push(BudgetPage,{budget: this.max,current: this.month_total});
  }



  billsPage(){
    this.nav.push(BillPayPage,{billAmount: 0});
  }


  compSummary(){
    this.nav.push(ComponentSummaryPage);
  }






  dayCompSummary(){
    this.nav.push(DayCompSummaryPage);
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
