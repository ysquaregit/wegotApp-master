import { Component } from '@angular/core';
import {DayInletChartComponent} from "../day-inlet-chart/day-inlet-chart";

/**
 * Generated class for the HourChartComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'hour-chart',
  templateUrl: 'hour-chart.html'
})
export class HourChartComponent {

  constructor() {
    console.log('Hello HourChartComponent Component');
  }

  public barChartOptions:any = {
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

  public barChartLabels:any[] = [0, 15, 30, 45];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartColors:Array<any> = [
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
    {data: [2, 14, 37, 6], label: 'Bathroom 1'}
  ];

// events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
