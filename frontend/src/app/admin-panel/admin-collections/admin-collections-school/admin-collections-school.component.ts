import { Component, OnInit } from '@angular/core';
import {AdminAgGridService} from "../admin-ag-grid.service";

@Component({
  selector: 'app-admin-collections-schools',
  templateUrl: './admin-collections-school.component.html',
  styleUrls: ['./admin-collections-school.component.css']
})
export class AdminCollectionsSchoolComponent implements OnInit {

  constructor(public agGridService : AdminAgGridService) { }

  ngOnInit() {
    this.agGridService.schools();
  }

}
