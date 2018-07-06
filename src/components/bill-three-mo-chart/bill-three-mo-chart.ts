import { Component } from '@angular/core';
import {MessageService} from '../../app/services/data.service';
import {Http} from '@angular/http';
import * as moment from 'moment';

@Component({
  selector: 'bill-three-mo-chart',
  templateUrl: 'bill-three-mo-chart.html'
})
export class BillThreeMoChartComponent {

  text: string;
  //barchart

  private monthMMinusOneName =  moment().subtract(1, "month").startOf("month").format('MMMM');
  private monthMinusTwoName =  moment().subtract(2, "month").startOf("month").format('MMMM');
  private monthMinusThreeName =  moment().subtract(3, "month").startOf("month").format('MMMM');

  public barChartOptions:any = {

    responsive: true,
    legend: {
      display: false,
      labels: {
        fontColor: 'rgb(255, 255, 255)',
        fontSize: 10,
        boxWidth:10
      },
      position:'bottom'
    }
  };

  public barChartLabels:string[] = [this.monthMinusThreeName,this.monthMinusTwoName,this.monthMMinusOneName];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  public barChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,166,215,0.6)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(0,166,215,0.4)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(0,166,215,0.6)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  //Dummy data

  // public barChartData:any[] = [
  //   {data: [334, 514, 240]}
  // ];

  //Live data

  public barChartData:any[] = [
    {data: [0,0,0]}
  ];

  //barchart

  constructor(private messageService: MessageService) {

    console.log('Hello BillThreeMoChartComponent Component');

    this.messageService.getTMCChartArray().subscribe(message => {

      console.log(message);
      let TMCdata = message.tmcchart.bh;
      this.barChartData = [];
      this.barChartLabels = [];

      let mondataArray = [];

      for (let dc in TMCdata) {
        mondataArray.push(TMCdata[dc].amount);
      }

      this.barChartData = (mondataArray);
      console.log(mondataArray);
    });
  }

}
