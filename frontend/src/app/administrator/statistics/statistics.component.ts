import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  constructor() { }

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
  public mapChart: GoogleChartInterface = {
    chartType: 'GeoChart',
    dataTable: [
      ['Lat', 'Long', 'Name'],
      [31.969839, 34.772755, 'Colman'],
      [32.176200, 34.836142, 'IDC Herzliya'],
      [32.090651, 34.80305, 'Shenkar'],
      [32.776769, 35.023095, 'Ben Gurion'],
      [31.262273, 34.801258, 'Technion']

    ],
    //opt_firstRowIsData: true,
    options: {
      'title': 'Israel',
      'region': 'IL',
      'height':600
    },
  };
  ngOnInit() {
  }

}
