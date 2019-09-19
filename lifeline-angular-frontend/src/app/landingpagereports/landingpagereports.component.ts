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
  BarChart1 = [];
  LineChart = [];
  constructor(private _reports: ReportgenerationserviceService) {

  }

  ngOnInit() {

    this._reports.donorreports().subscribe(res => {
      this.donorreport = res;
      console.log(this.donorreport);
    
    this._reports.recepientreports().subscribe(res => {
      this.recepientreport = res;
      console.log(this.recepientreport);
   

    this.BarChart = new Chart('barChart',
      {
        type: 'bar',
        animationEnabled: true,
        data:
        {
          labels: ["Number of users registered"],
          datasets:
            [{
              backgroundColor: [
                "#cddc39",
              ],
              label: 'Number of donors registered',
              data: [this.donorreport],
            },
            {
              backgroundColor: [
                "#80d9eb",
              ],
              label: 'Number of recepient registered',
              data: [this.recepientreport],
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
  }) })
    //   this._reports.recepientreports()
    // .subscribe(res => {
    //   this.recepientreport = res
    //   console.log(this.recepientreport);
    // this.BarChart = new Chart('barChart1',
    //   {
    //     type: 'bar',
    //     animationEnabled: true,
    //     data:
    //     {
    //       labels: ["Number of recepients registered"],
    //       datasets:
    //         [{
    //           backgroundColor: [

    //             "#e74c3c",

    //           ],
    //           label: 'Number of recepients registered',
    //           data: [this.recepientreport],
    //           fill: false,
    //           lineTension: 0.2,
    //           borderColor: "blue",
    //           borderWidth: 2
    //         }]
    //     },
    //     options:
    //     {
    //       title: {
    //         text: "",
    //         display: true,
    //         responsive: true
    //       },
    //       scales: {
    //         yAxes: [{
    //           ticks: {
    //             beginAtZero: true,
    //             min: 0,
    //             max: 50,
    //             stepSize: 5,
    //           }
    //         }]

    //       }


    //     }
    //   }
    // );
    // });

    this._reports.organdonationreports()
      .subscribe(res => {
        this.organdonationreport = res
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
              labels: ["Blood", "BoneMarrow", "Cornea", "Heart", "Kidney", "Liver", "Lungs", "Platelet"],
              datasets:
                [{
                  backgroundColor: [
                    "#87eccf",
                    "#d1dc4e",
                    "#f6c343",
                    "#52bada",
                    "#3e85f2",
                    "#37f63d2",
                    "#e68280",
                    "#3b50b1",
                    // "#34495e"
                  ],

                  label: 'Number of donations so far',

                  data: [this.organdonationreport[0], this.organdonationreport[1], this.organdonationreport[2], this.organdonationreport[3], this.organdonationreport[4], this.organdonationreport[5], this.organdonationreport[6], this.organdonationreport[7]],
                  fill: false,
                  lineTension: 0.2,
                  // borderColor: "blue",
                  // borderWidth: 2
                }]
            },
            options:
            {
              title: {
                text: "",
                display: true,
                responsive: true
              },
              // scales: {
              //   yAxes: [{
              //     ticks: {
              //       beginAtZero: true,
              //       min: 0,
              //       max: 50,
              //       stepSize: 5,
              //       // suggestedMin: 0,
              //       // suggestedMax: 100
              //     }
              //   }]

              // }



            }
          }
        );
      });

  }

}
