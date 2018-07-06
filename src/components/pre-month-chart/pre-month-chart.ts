import {Component} from '@angular/core';
import {MessageService} from "../../app/services/data.service";
import {MonthChartComponent} from "../month-chart/month-chart";
import {PopoverController} from "ionic-angular";

@Component({
  selector: 'pre-month-chart',
  templateUrl: 'pre-month-chart.html'
})
export class PreMonthChartComponent {

  // dayCompSumData: any[] = [];
  // dayCompSumArray: any[] = [];
  // agg_total: number;
  // compObject: {
  //   compName: string,
  //   compValue: number
  // };

  constructor(private messageService: MessageService,
              public popoverCtrl: PopoverController,) {
    console.log('Hello PreMonthChartComponent Component');
    this.messageService.getPreMonthTotalChart().subscribe(message => {

      console.log(message);
      let monthTotaldata = message.preMoToChart.pdct;
      this.barChartData = [];
      this.barChartLabels = [];

      let chartData = [];
      let chartLabel = [];

      for (let dc in monthTotaldata) {
        chartData.push(monthTotaldata[dc].agg_total);
        chartLabel.push(monthTotaldata[dc].dt);
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

  public barChartLabels: any[] = [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
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

}
