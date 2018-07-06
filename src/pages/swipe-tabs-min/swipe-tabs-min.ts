import {Component, ViewChild} from '@angular/core';
import {Slides} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {Http} from '@angular/http';
import {MessageService} from '../../app/services/data.service';
import {LoadingController} from 'ionic-angular';
/**
 * Generated class for the SwipeTabsMinPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-swipe-tabs-min',
  templateUrl: 'swipe-tabs-min.html',
})
export class SwipeTabsMinPage {
  tabs: any = '0';
  constructor(public messageService: MessageService,public  http: Http) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SwipeTabsMinPage');
  }

  getData() {

    const URL = 'http://dev3.venaqua.com:8500/fed/mparams/1';
    Observable.timer(0, 10000)
      .flatMap(() => this.http.get(URL)
        .map(res => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')))
      .subscribe(data => {
        if (typeof data == 'undefined') {
          console.log("CAUGHT");
        }
        else {
          console.log("nothing");
        }

//params observables
        this.messageService.senddayTotal(data.params.daytotal);
        this.messageService.sendMonthTotal(data.params.month_total);
        this.messageService.sendven_cur_cost(data.params.cur_cost);
        this.messageService.sendven_prev_month_total(data.params.prev_month_total);
        this.messageService.sendven_prev_month_cost(data.params.prev_month_cost);
        this.messageService.sendven_cur_budget(data.params.cur_budget);
        this.messageService.sendven_prev_budget(data.params.prev_budget);
        this.messageService.sendven_balancebudget(data.params.balancebudget);
        this.messageService.sendven_rp(data.params.rp);
        this.messageService.sendven_prev_rp(data.params.prev_rp);
        this.messageService.sendALCount(data.params.alarms);

//daychart observable
        this.messageService.sendMDChartArray(data.daychart);

       // this.messageService.sendPMChartArray(data.prevMonChart);
       // this.messageService.sendMHChartArray(data.monthcomptotal);


      });

  }



  changeWillSlide($event) {
    this.tabs = $event._snapIndex.toString();
  }
}
