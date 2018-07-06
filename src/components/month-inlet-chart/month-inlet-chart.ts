import {Component} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {MessageService} from "../../app/services/data.service";

@Component({
  selector: 'month-inlet-chart',
  templateUrl: 'month-inlet-chart.html'
})
export class MonthInletChartComponent {

  public data: string = 'KBT';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public messageService: MessageService) {
    console.log('Month-inlet-chart component');

    this.messageService.getMonthChartInletwise()

      .subscribe(message => {

        console.log(message);
        let preMonthTotaldata = message.monChInlet.dc;
        console.log('Hello MonthChartComponent Component');

        this.barChartData = [];
        this.barChartLabels = [];

        let chartData = [];
        let chartLabel = [];
        let chartName = [];


        for (let dc in preMonthTotaldata) {
          if (preMonthTotaldata[dc].cust_name == this.data) {
            chartData.push(preMonthTotaldata[dc].day_total);
            chartLabel.push(preMonthTotaldata[dc].dt);
          }
          else {
            console.log('wrong inlet');
          }
        }
        this.barChartLabels = (chartLabel);
        console.log('chartLabel' + chartLabel);
        this.barChartData = (chartData);
        console.log('chartData' + chartData);

      });
  }


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,

    scales: {
      xAxes: [{
        // type: 'time',
        // unit: 'day',
        // autoSkip: true,
        // unitStepSize: 1,
        // time: {
        //   displayFormats: {
        //     'millisecond': 'DD',
        //     'second': 'DD',
        //     'minute': 'DD',
        //     'hour': 'DD',
        //     'day': 'DD',
        //     'week': 'DD',
        //     'month': 'DD',
        //     'quarter': 'DD',
        //     'year': 'DD',
        //   }
        // },
        gridLines: {
          display: false
        }
      }]
    },
    yAxes: [{
      // ticks: {
      //   beginAtZero: true
      // },
      gridLines: {
        display: true
      }
    }]
  };

  public barChartLabels: number[] = [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 22, 25, 26, 27, 28, 29, 30, 31];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;

  public lineChartColors: Array<any> = [
    { // grey
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
    {
      data: [20, 25, 58, 90, 58],
      label: 'Bathroom 1'
    }
  ];

// events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
