import {Component} from '@angular/core';
import {MessageService} from '../../app/services/data.service';
import {AlertController} from 'ionic-angular';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'hist-detail',
  templateUrl: 'hist-detail.html'
})
export class HistDetailComponent {

  text: string;


  //begins
  public detailData: Array<any> = [1, 1, 1, 1, 1];

  public detailLabel: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]; //,'16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
  public detailChartOptions: any = {

    elements: {
      line: {
        tension: 0.3, // disables bezier curves

      }

    },
    pointRadius: 1,
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 255, 255)',
        fontSize: 10,
        boxWidth: 10
      },
      position: 'bottom'
    },

    responsive: true,
    zoom: {
      // Boolean to enable zooming
      enabled: true,

      // Zooming directions. Remove the appropriate direction to disable
      // Eg. 'y' would only allow zooming in the y direction
      mode: 'xy',
      rangeMin: {
        // Format of min zoom range depends on scale type
        x: 0,
        y: 0
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }

  };
  public detailColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,94,120,0)',
      borderColor: 'rgba(0,94,120,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(0,94,120,0)',
      borderColor: 'rgba(0,94,120,.8)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(0,166,215,0)',
      borderColor: 'rgba(0,94,120,.6)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(0,166,215,0)',
      borderColor: 'rgba(0,94,120,.4)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(0,166,215,0)',
      borderColor: 'rgba(0,94,120,.2)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public detailLegends: boolean = true;
  public detailChartType: string = 'line';


  //ends
  constructor(private messageService: MessageService, public alertCtrl: AlertController, public navCtrl: NavController) {
    console.log('Hello HistDetailComponent Component');
    this.text = 'Hello World';

    this.messageService.getMHDChartArray().subscribe(message => {
//check if the data is incoming or empty

      if (message.mhodchart.hdc.length > 0) {
        //data available


        let dats = [];
        let dats2 = [];

        //line graph
        let datPacket = message.mhodchart;
        console.log("type of");
        for (let dc in datPacket) {
          dats[dc] = datPacket[dc];
        }
        console.log(dats);

        for (let dat in dats) {
          dats2.push(dats[dat]);
        }
        console.log(dats2);
        this.detailData = dats2[0];


      }
      else {
        //empty trigger a pop up showing no data
        this.showPrompt();
      }


    });
  }


  showPrompt() {

    let alert = this.alertCtrl.create({
      title: 'No Data',
      subTitle: 'Oops Seems like we dont have any data for the selected month!',
      buttons: ['Dismiss']
    });
    alert.present();

  }


}
