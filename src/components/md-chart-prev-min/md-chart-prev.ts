// import { Component } from '@angular/core';
// import { MessageService } from '../../app/services/data.service';
//
//
//
// @Component({
//   selector: 'md-chart-prev-min',
//   templateUrl: 'md-chart-prev.html'
// })
// export class MdChartPrevMinComponent {
//   daychart = [];
//   dataArray=[];
//   labelsArray=[];
//
//   public lineChartData:Array<any> = [
//     {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
//   ];
//   public lineChartLabels:Array<any> = [1,2,3,5];
//   public lineChartOptions:any = {
//     elements: {
//       line: {
//         tension: .05, // disables bezier curves
//       }
//     },
//
//     responsive: true,
//     scales: {
//       xAxes: [{
//         type: 'time',
//         unit: 'day',
//         autoSkip: true,
//         unitStepSize: 1,
//         time: {
//           displayFormats: {
//             'millisecond': 'DD',
//             'second': 'DD',
//             'minute': 'DD',
//             'hour': 'DD',
//             'day': 'DD',
//             'week': 'DD',
//             'month': 'DD',
//             'quarter': 'DD',
//             'year': 'DD',
//           }
//         },
//         gridLines: {
//           display: false
//         }
//
//       }],
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         },
//         gridLines: {
//           display: true
//         }
//       }]
//     }
//
//   };
//   public lineChartColors:Array<any> = [
//     { // grey
//       backgroundColor: 'rgba(0,166,215,0.05)',
//       borderColor: 'rgba(41,116,157,1)',
//       pointBackgroundColor: 'rgba(0,52,89,0.8)',
//       pointBorderColor: 'rgba(0,52,89,0.8)',
//       pointHoverBackgroundColor: 'rgba(148,159,177,0)',
//       pointHoverBorderColor: 'rgba(247,160,114,0.8)'
//     }
//   ];
//   public lineChartLegend:boolean = false;
//   public lineChartType:string = 'line';
//
//
//   // events
//   public chartClicked(e:any):void {
//
//   }
//
//   public chartHovered(e:any):void {
//
//   }
//
//
//
//
//
//
//   /*
//     text: string;
//     ven_mdchart_dataset = [
//       {
//         label: "Daily Usage",
//         data: [65, 59, 80, 81, 56, 55, 40],
//         backgroundColor: 'rgba(255,255,255,0.8)',
//         borderColor: 'rgba(130, 220, 240, 1)'
//       }
//     ];
//
//
//   dataSet: any[] = myGlobals.ven_mdchart_dataset;
//
//     type = 'line';
//     data = {
//       labels: [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
//       datasets: this.ven_mdchart_dataset
//     };
//     options = {
//       legend: {
//         display: false,
//         position: 'bottom',
//         labels: {
//           boxWidth: 80,
//           fontColor: 'black'
//         }
//       },
//       responsive: true,
//       maintainAspectRatio: false,
//       scales: {
//         yAxes: [{
//           ticks: {
//             display: false,
//             stepSize: 20,
//             fontColor: 'white'
//           },
//         }],
//         xAxes: [{
//           gridLines: {
//             display: false
//           },
//           scaleLabel: {
//             display: false,
//             labelString: "Time in Seconds",
//             fontColor: "red",
//
//           },
//           ticks: {
//             display:false,
//             maxTicksLimit: 5,
//             fontColor: 'white',
//             rotation:22
//           },
//         }]
//       }
//     };
//   */
//
//
//
//
//
//
//   constructor(private messageService: MessageService) {
//
//     console.log('Hello MdChartComponent Component');
//
//
//     this.messageService.getPMChartArray().subscribe(message => {
//
//       // this.ven_mdchart_dataset = message.mdchart;
//       console.log(message);
//
//       this.daychart = message.pmchart;
//
//
//       this.dataArray=[];
//       this.labelsArray=[];
//
//
//       for( let dc in this.daychart)
//       {
//         this.dataArray.push({x: this.daychart[dc].dt , y: this.daychart[dc].value });
//         //this.labelsArray.push(this.daychart[dc].dt);
//
//
//       }
//       //console.log(this.dataArray);
//       this.lineChartData = (this.dataArray);
//
//
//
//
//
//     });
//
//   }
//
// }
