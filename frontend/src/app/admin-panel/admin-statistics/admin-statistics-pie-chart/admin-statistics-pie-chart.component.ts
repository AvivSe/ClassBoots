import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-statistics-pie-chart',
  templateUrl: './admin-statistics-pie-chart.component.html',
  styleUrls: ['./admin-statistics-pie-chart.component.css']
})
export class AdminStatisticsPieChartComponent implements OnInit {


  constructor() {}

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    //opt_firstRowIsData: true,
    options: {
      'title': 'Tasks',
      'height':600
    },
  };

  ngOnInit() {
  }


}
