import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reportgeneration',
  templateUrl: './reportgeneration.component.html',
  styleUrls: ['./reportgeneration.component.css']
})
export class ReportgenerationComponent implements OnInit {

  constructor() { }

  
    LineChart = [];
    BarChart = [];
    LineChart1=[];
    public chartType: string = 'line';
    ngOnInit() {
      this.LineChart = new Chart('lineChart',
        {
          type: 'line',
          animationEnabled: true,
          data:
          {
            labels: ["Jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
            datasets:
              [{
                label: 'number of donors registered in each month',
                data: [9, 7, 3, 5, 10, 15, 16, 62, , 3, 1, 9],
  
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
              yaxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
  
            }
  
  
          }
        }
      );
      this.BarChart = new Chart('barChart',
        {
          type: 'bar',
          animationEnabled: true,
          data:
          {
            labels: ["Jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
            datasets:
              [{
                label: 'number of registered registered in each month',
                data: [9, 7, 3, 5, 10, 15, 16, 29, , 3, 1, 9],
                // fill: false,
                // lineTension: 0.2,
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
              yaxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
  
            }
  
  
          }
        }
      );
  
      this.LineChart1 = new Chart('lineChart1',
      {
        type: 'line',
        animationEnabled: true,
        data:
        {
          labels: ["Jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
          datasets:
            [{
              label: 'number of donations so far',
              data: [20, 33, 21, 12, 10, 19, 45, 62, ,23, 11, 39],
  
              fill: false,
              lineTension: 0.7,
              borderColor: "blue",
              borderWidth: 2
            }]
        },
        axisX:{
          interval: 1
        },
        options:
        {
          title: {
            text: "",
            display: true,
            responsive: true,
            maintainAspectRatio: true,
                  scaleOverride: true,
                  scaleSteps: 10,
                  scaleStepWidth: Math.pow(10,2),
                  scaleStartValue: 0
          },
          scales: {
            yaxes: [{
              ticks: {
                beginAtZero: true,
                stepSize: 1,
                interval:2
              }
            }]
  
          }
  
  
        }
      }
    );
  
    }
   
  
  
  }


