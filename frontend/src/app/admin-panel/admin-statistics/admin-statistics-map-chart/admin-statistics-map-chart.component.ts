import {Component, OnDestroy, OnInit} from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-statistics-map-chart',
  templateUrl: './admin-statistics-map-chart.component.html',
  styleUrls: ['./admin-statistics-map-chart.component.css']
})
export class AdminStatisticsMapChartComponent{

  constructor(private http: HttpClient) {
    this.mapChart.dataTable = [];
    this.mapChart.dataTable .push(['Lat', 'Long', 'Name']);
    this.http.get(environment.baseUrl + 'api/institution').subscribe(data => {
      for (let i in data) {
        let getLocation = data[i].geolocation.toString().split(",");
        this.mapChart.dataTable.push([Number(getLocation[0]), Number(getLocation[1]), String(data[i].name) ]);
      }
    });
  }

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

}
