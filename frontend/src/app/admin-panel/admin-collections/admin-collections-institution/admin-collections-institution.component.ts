import { Component, OnInit } from '@angular/core';
import {AdminAgGridService} from "../admin-ag-grid.service";

@Component({
  selector: 'app-admin-collections-institution',
  templateUrl: './admin-collections-institution.component.html',
  styleUrls: ['./admin-collections-institution.component.css']
})
export class AdminCollectionsInstitutionComponent implements OnInit {


  constructor(public agGridService : AdminAgGridService) { }

  ngOnInit() {
    this.agGridService.institutions();
  }


}
