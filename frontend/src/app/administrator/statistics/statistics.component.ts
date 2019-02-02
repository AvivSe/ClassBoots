import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.mapChart.dataTable = [];
    this.mapChart.dataTable .push(['Lat', 'Long', 'Name']);
    this.http.get('http://localhost:8080/api/institution').subscribe(data => {
      for (let i in data) {
        let getLocation = data[i].geolocation.toString().split(",");
        this.mapChart.dataTable.push([Number(getLocation[0]), Number(getLocation[1]), String(data[i].name) ]);
      }
    });
  }

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
    //dataTable: this.geoMapData,
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
