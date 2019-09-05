import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-dashboardreports',
  templateUrl: './dashboardreports.component.html',
  styleUrls: ['./dashboardreports.component.css']
})
export class DashboardreportsComponent implements OnInit {
  BarChart = [];
  constructor() { }
  ngOnInit() {
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

  
}

}
