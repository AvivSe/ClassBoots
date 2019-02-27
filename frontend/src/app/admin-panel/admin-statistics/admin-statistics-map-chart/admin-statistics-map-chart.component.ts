import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {} from 'googlemaps';

@Component({
  selector: 'app-admin-statistics-map-chart',
  templateUrl: './admin-statistics-map-chart.component.html',
  styleUrls: ['./admin-statistics-map-chart.component.css']
})
export class AdminStatisticsMapChartComponent implements OnDestroy, OnInit{
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    var mapProp = {

      center: new google.maps.LatLng(31.789618, 34.960488),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    let location = new google.maps.LatLng(31.789618, 34.960488);

    this.http.get(environment.baseUrl + 'api/institution').subscribe(data => {
      this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

      for(let i in data) {
        if(data[i].geolocation) {
          let getLocation = data[i].geolocation.toString().split(",");
          new google.maps.Marker({
            position: new google.maps.LatLng(Number(getLocation[0]),Number(getLocation[1])),
            icon: 'http://icons.iconarchive.com/icons/google/noto-emoji-people-profession/32/10212-woman-student-icon.png',
            map: this.map,
            title: 'Got you!'
          });

        }
      }
      });

  }
  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  ngOnDestroy(): void {
  }
  // constructor(private http: HttpClient) {
    // this.mapChart.dataTable = [];
    // this.mapChart.dataTable .push(['Lat', 'Long', 'Name']);
    // this.http.get(environment.baseUrl + 'api/institution').subscribe(data => {
    //   for (let i in data) {
    //     if(data[i].geolocation) {
    //       let getLocation = data[i].geolocation.toString().split(",");
    //       this.mapChart.dataTable.push([Number(getLocation[0]), Number(getLocation[1]), String(data[i].name)]);
    //     }
    //   }
    // });
  //}

  // public mapChart: GoogleChartInterface = {
  //   chartType: 'GeoChart',
  //   //dataTable: this.geoMapData,
  //   //opt_firstRowIsData: true,
  //   options: {
  //     'title': 'Israel',
  //     'region': 'IL',
  //     'height':600
  //   },
  // };

}
