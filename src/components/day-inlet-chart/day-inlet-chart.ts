import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {HourSummaryChartPage} from "../../pages/hour-summary-chart/hour-summary-chart";

@Component({
  selector: 'day-inlet-chart',
  templateUrl: 'day-inlet-chart.html'
})
export class DayInletChartComponent {

  constructor(public navCtrl: NavController,
  ) {
    console.log('Hello DayInletChartComponent Component');
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
    // scales: {
    //   xAxes: [{
    //     type: 'time',
    //     unit: 'day',
    //     autoSkip: true,
    //     unitStepSize: 1,
    //     time: {
    //       displayFormats: {
    //         'millisecond': 'DD',
    //         'second': 'DD',
    //         'minute': 'DD',
    //         'hour': 'DD',
    //         'day': 'DD',
    //         'week': 'DD',
    //         'month': 'DD',
    //         'quarter': 'DD',
    //         'year': 'DD',
    //       }
    //     },
    //     gridLines: {
    //       display: false
    //     }
    //   }]
    // },
    // yAxes: [{
    //   ticks: {
    //     beginAtZero: true
    //   },
    //   gridLines: {
    //     display: true
    //   }
    // }]
  };

  public barChartLabels:number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public lineChartColors:Array<any> = [
    {
      backgroundColor: '#40ACE2',
      borderColor: '#565757',
      pointBackgroundColor: '#40ACE2',
      pointBorderColor: '#565757',
      pointHoverBackgroundColor: '#40ACE2',
      pointHoverBorderColor: '#565757'
    }
  ];

  public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0, 5, 30, 74, 12, 8, 14, 7], label: 'Bathroom 1'}
  ];

// events
  public chartClicked(e:any):void {
    this.navCtrl.push(HourSummaryChartPage);
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
