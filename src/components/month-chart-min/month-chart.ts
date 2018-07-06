import {Component} from '@angular/core';
import * as moment from 'moment';
import {MessageService} from '../../app/services/data.service';
import {NavController} from 'ionic-angular';
import {HistChartPage} from '../../pages/hist-chart/hist-chart';
import {Http} from '@angular/http';

@Component({
  selector: 'month-chart-min',
  templateUrl: 'month-chart.html'
})
export class MonthChartMinComponent {
  data: any;
  text: string;
  //begin

  selectedMonth: number;
  apartID: number = 1;
  public horiChartOptions: any = {

    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 255, 255)',
        fontSize: 10,
        boxWidth: 10
      },
      position: 'bottom'
    }

  };

  private monthM = moment().format('MMMM');
  private monthMinusOneName = moment().subtract(1, "month").startOf("month").format('MMMM');
  private monthMinustwoName = moment().subtract(2, "month").startOf("month").format('MMMM');

  public horiChartLabels: string[] = [this.monthMinustwoName, this.monthMinusOneName, this.monthM];
  public horiChartType: string = 'bar';
  public horiChartLegend: boolean = true;
  public horiChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(233,109,87,0.5)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(233,109,87,0.6)',  //'rgba(0,166,215,.8)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(233,109,87,0.7)', //'rgba(152,193,217,.8)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(233,109,87,0.8)', //'rgba(152,193,217,.8)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(233,109,87,0.9)', //'rgba(152,193,217,.8)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public horiChartData: any[] = [
    {data: [0, 0, 0], label: '-'}, {data: [0, 0, 0], label: '-'}, {data: [0, 0, 0], label: '-'}  ];


  //end

  public chartClicked(e: any): void {
    if (e.active[0]._index == 0) {
      this.selectedMonth = 2;
    }
    else if (e.active[0]._index == 1) {

      this.selectedMonth = 1;
    }
    else if (e.active[0]._index == 2) {

      this.selectedMonth = 0;
    }

    console.log(this.selectedMonth);
this.apartID = 1;
this.selectedMonth = 1;
    this.load(this.apartID, this.selectedMonth);
    //sending to next page
    this.navCtrl.push(HistChartPage, {mts: this.selectedMonth});

    //get data
    //this.getData(this.apartID,this.selectedMonth);



  }

  load(apartid, monthreq) {



    return new Promise(resolve => {

      this.http.get('http://dev3.venaqua.com:8500/fed/hdc/' + apartid + '/' + monthreq)
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
          console.log(this.data);


          this.messageService.sendMHDChartArray(this.data);


        });
    });
  }


  constructor(private messageService: MessageService, public navCtrl: NavController, private http: Http) {
    console.log('Hello MonthChartComponent Component');
    this.text = 'Hello World';


    this.messageService.getMHChartArray().subscribe(message => {
      //console.log(message.mhochart);
      this.horiChartData = message.mhochart;


    });
  }

}
