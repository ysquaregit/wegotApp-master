import {Component} from '@angular/core';
import {NavController, NavParams, PopoverController} from "ionic-angular";
import {DayInletChartComponent} from "../day-inlet-chart/day-inlet-chart";
import {MessageService} from "../../app/services/data.service";

import * as myGlobals from "../../app/globals";
import * as moment from 'moment';


@Component({
  selector: 'day-chart',
  templateUrl: 'day-chart.html'
})

//Dummy data

/*export class DayChartComponent {
  myDate = 2017/12/10;
  dayUsage: number = 332;


  constructor(public popoverCtrl: PopoverController) {
    console.log('Hello DayChartComponent Component');
  }

  private customerDayValue: CustomerDayValue[] = [
    new CustomerDayValue(1101, 'Kitchen', 82, 0),
    new CustomerDayValue(1101, 'Bathroom 1', 250, 0),
    // new CustomerDayValue(1101, 'Bathroom 2', 85, 0),
    // new CustomerDayValue(1101, 'Common Tap', 23, 0)
    // new CustomerDayValue(1102, 'Kitchen', 24, 0),
    // new CustomerDayValue(1102, 'Bathroom 1', 35, 0),
    // new CustomerDayValue(1102, 'Bathroom 2', 40, 0),y
    // new CustomerDayValue(1102, 'Common Tap', 10, 0)
  ];*/

//Live data
export class DayChartComponent {

  dayTotal = myGlobals.ven_dayTotal;
  dayCompSumData: any[] = [];
  dayCompSumArray: any[] = [];
  agg_total: number;
  compObject: {
    compName: string,
    compValue: number
  };

  constructor(public popoverCtrl: PopoverController,
              private messageService: MessageService,
              public navCtrl: NavController,
              public navParams: NavParams) {

    console.log('Hello DayChartComponent Component');
    this.messageService.getDaytotal().subscribe(message => {
      this.dayTotal = message.ven_dayTotal;
    });
    this.loadData();

    //To load chart

    // this.loadData1();
  }

  //To load chart data

  /*public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    // legend: {
    //   display: false,
    // },
    scales: {
      xAxes: [{
        label: 'hour',
        display: true,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        label: 'Litres used',
        display: true,
        gridLines: {
          display: true
        }
      }]
    }
  };

  public barChartLabels: any[] = [1,2,3,4,5,6,7];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public barChartColors: Array<any> = [
    {
      backgroundColor: '#40ACE2',
      borderColor: '#565757',
      pointBackgroundColor: '#40ACE2',
      pointBorderColor: '#565757',
      pointHoverBackgroundColor: '#40ACE2',
      pointHoverBorderColor: '#565757'
    }
  ];

  // public barChartData: any[] = [];

  public barChartData: any[] = [
    {data: [2, 0, 0, 0, 0, 35, 69, 79, 23, 21, 43, 1, 23], label: 'Overall'}
  ];

// events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  presentPopover(myEvent, points) {
    console.log(points);
    let popover = this.popoverCtrl.create(DayInletChartComponent);
    popover.present({
      ev: myEvent
    });
  }*/

  loadData() {
    this.messageService.getDayCompSummary().subscribe(message => {

      console.log(message);
      this.dayCompSumArray = message.daycompdata.dcs;

      for (let datapoint in this.dayCompSumArray) {
        this.compObject = ({
          compName: this.dayCompSumArray[datapoint].cust_name,
          compValue: this.dayCompSumArray[datapoint].day_total
        });
        this.dayCompSumData.push(this.compObject);
        console.log(this.dayCompSumData);
      }
    });
  }

  // To load chart data using message

  /*loadData1() {
    this.messageService.getMonthTotalChart().subscribe(message => {

      console.log(message);
      let monthTotaldata = message.moToChart.dct;
      this.barChartData = [];
      this.barChartLabels = [];

      let chartData = [];
      let chartLabel = [];

      for (let dc in monthTotaldata) {
        chartData.push(monthTotaldata[dc].agg_total);
        chartLabel.push(monthTotaldata[dc].dt);
      }
      this.barChartLabels = (chartLabel);
      console.log('chartLabel' +chartLabel);
      this.barChartData = (chartData);
      console.log('chartData' +chartData);
    });
  }
*/

}
