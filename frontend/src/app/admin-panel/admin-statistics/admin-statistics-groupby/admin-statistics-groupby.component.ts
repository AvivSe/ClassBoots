import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../../partitial/entities/entities.service";

@Component({
  selector: 'app-admin-statistics-groupby',
  templateUrl: './admin-statistics-groupby.component.html',
  styleUrls: ['./admin-statistics-groupby.component.css']
})
export class AdminStatisticsGroupbyComponent implements OnInit {
  data : [];
  constructor(private entitiesService:entitiesService) { }

  ngOnInit() {
    this.entitiesService.getSchoolsGroupBy((data)=>{
      this.data = data;
    })

  }

}
