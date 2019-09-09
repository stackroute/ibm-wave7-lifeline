import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportgenerationserviceService } from '../service/reportgenerationservice.service';


@Component({
  selector: 'app-landingpagereports',
  templateUrl: './landingpagereports.component.html',
  styleUrls: ['./landingpagereports.component.css']
})
export class LandingpagereportsComponent implements OnInit {
  donorreport;
  recepientreport;
  organdonationreport;
  heartcount;
 
  BarChart = [];
  BarChart1=[];
  LineChart = [];
  constructor(private _reports:ReportgenerationserviceService)
  {

  }

  ngOnInit() {
    this._reports.donorreports()
    .subscribe(res => {this.donorreport=res
 
      console.log(this.donorreport);
    this.BarChart = new Chart('barChart',
      {
        type: 'bar',
        animationEnabled: true,
        data:
        {
          labels: ["Number od donors registered"],
          datasets:
            [{
              backgroundColor: [
               
                // "#9b59b6",
                // "#6a5acd",
                "#3cb371",
                // "hsl(147, 50%, 47%)"
               
              ],
               label: 'Number of donors registered in each month',
              // data: [9, 7, 3, 5, 10, 15, 16, 62, , 3, 1, 9],
              // data: this.donorreport,
              data:[this.donorreport],
              // fill: false,
              // lineTension: 0.7,
              borderColor: "blue",
              borderWidth: 2
            }]
        },
        options:
        {
          title: {
            text: "",
            display: true,
            responsive: true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 50,
                stepSize: 5,
              }
            }]

          }


        }
      }
    );
    });
    this._reports.recepientreports()
    .subscribe(res => {this.recepientreport=res
      console.log(this.recepientreport);
    this.BarChart = new Chart('barChart1',
      {
        type: 'bar',
        animationEnabled: true,
        data:
        {
          labels: ["Green"],
          datasets:
            [{
              backgroundColor: [
               
                "#e74c3c",
                
              ],
              label: 'Number of recepients registered in each month',
              data: [this.recepientreport],
              fill: false,
              lineTension: 0.2,
              borderColor: "blue",
              borderWidth: 2
            }]
        },
        options:
        {
          title: {
            text: "",
            display: true,
            responsive: true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 50,
                stepSize: 5,
              }
            }]

          }


        }
      }
    );
  });

    this._reports.organdonationreports()
  .subscribe(res => {
    this.organdonationreport=res
    console.log(this.organdonationreport);
    this.LineChart = new Chart('lineChart',
    {
      type: 'pie',
      showInLegend: true,
			toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
			indexLabel: "{name} - #percent%",
      animationEnabled: true,
      data:
      {
        labels: [ "Blood","BoneMarrow","Cornea","Heart","Kidney","Liver","Lungs","Platelet"],
        datasets:
          [{
            backgroundColor: [
                "#72b3b1",
                "#feb56d	",
                "#c55a83",
                "#795f91",
                "hsl(0, 60%, 50%)",
                "DodgerBlue",
                "h#cd6d71",
                "hsl(0, 0%, 71%)",
                // "#34495e"
              ],
            
           label: 'Number of donations so far',
            
            data: [this.organdonationreport[0],this.organdonationreport[1],this.organdonationreport[2],this.organdonationreport[3],this.organdonationreport[4],this.organdonationreport[5],this.organdonationreport[6],this.organdonationreport[7]],
            fill: false,
            lineTension: 0.2,
            borderColor: "blue",
            borderWidth: 2
          }]
      },
      options:
      {
        title: {
          text: "",
          display: true,
          responsive: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 50,
              stepSize: 5,
              // suggestedMin: 0,
              // suggestedMax: 100
            }
          }]

        }
       


      }
    }
  );
});

}

}
