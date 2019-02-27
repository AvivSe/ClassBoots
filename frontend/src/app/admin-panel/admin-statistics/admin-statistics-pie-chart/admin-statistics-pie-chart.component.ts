import {Component, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-admin-statistics-pie-chart',
  templateUrl: './admin-statistics-pie-chart.component.html',
  styleUrls: ['./admin-statistics-pie-chart.component.css']
})
export class AdminStatisticsPieChartComponent  {
  @ViewChild("outlet", {read: ViewContainerRef}) outletRef: ViewContainerRef;
  @ViewChild("content", {read: TemplateRef}) contentRef: TemplateRef<any>;

  title = 'Pie Chart';
  subtitle = '';
  loaded: boolean = false;
  DATA: any[] = [];

  cms: any;
  constructor(private http: HttpClient) {
    http.get(environment.baseUrl + 'api/cms').subscribe(cms=> {
      this.cms = cms;
      this.switchTo(this.cms.institutions);
      this.subtitle = 'Show institution by total views';
      this.loaded=true;
    });
  }

  switchTo(array) {
    this.loaded = false;
    this.DATA = [];
    if(array) {
      array.forEach(a => {
        if (a.totalViews > 0) {
          this.DATA.push({age: a.name, population: a.totalViews});
        }
      });
    } else {
      this.switchTo(this.cms.institutions);
    }
    this.loaded = true;
    this.rerender();
  }

  private rerender() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }

  ngAfterContentInit() {
    this.outletRef.createEmbeddedView(this.contentRef);
  }
}
