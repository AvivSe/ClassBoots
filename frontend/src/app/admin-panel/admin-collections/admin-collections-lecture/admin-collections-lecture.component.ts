import { Component, OnInit } from '@angular/core';
import {AdminAgGridService} from "../admin-ag-grid.service";

@Component({
  selector: 'app-admin-collections-lecture',
  templateUrl: './admin-collections-lecture.component.html',
  styleUrls: ['./admin-collections-lecture.component.css']
})
export class AdminCollectionsLectureComponent implements OnInit {


  constructor(public agGridService : AdminAgGridService) { }

  ngOnInit() {
    this.agGridService.lectures();
  }

}
