import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-admin-statistics-pie-chart',
  templateUrl: './admin-statistics-pie-chart.component.html',
  styleUrls: ['./admin-statistics-pie-chart.component.css']
})
export class AdminStatisticsPieChartComponent  {
  title = 'Pie Chart';
  loaded: boolean = false;
  DATA: any[] = [];

  cms: any;
  constructor(private http: HttpClient) {
    http.get(environment.baseUrl + 'api/cms').subscribe(cms=> {
      this.cms = cms;
      this.cms.institutions.forEach(inst=> {
        if(inst.totalViews > 0) {
          this.DATA.push({age: inst.name, population: inst.totalViews});
        }
      });
      this.loaded=true;
    });
  }

}
