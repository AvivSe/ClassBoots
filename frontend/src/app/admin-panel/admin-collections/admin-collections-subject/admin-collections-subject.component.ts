import { Component, OnInit } from '@angular/core';
import {AdminAgGridService} from "../admin-ag-grid.service";

@Component({
  selector: 'app-admin-collections-subject',
  templateUrl: './admin-collections-subject.component.html',
  styleUrls: ['./admin-collections-subject.component.css']
})
export class AdminCollectionsSubjectComponent implements OnInit {

  constructor(public agGridService : AdminAgGridService) { }

  ngOnInit() {
    this.agGridService.subjects();
  }


}
