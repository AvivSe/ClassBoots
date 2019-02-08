import { Component, OnInit } from '@angular/core';
import {AdminAgGridService} from "../admin-ag-grid.service";

@Component({
  selector: 'app-admin-collections-video',
  templateUrl: './admin-collections-video.component.html',
  styleUrls: ['./admin-collections-video.component.css']
})
export class AdminCollectionsVideoComponent implements OnInit {


  constructor(public agGridService : AdminAgGridService) { }

  ngOnInit() {
    this.agGridService.videos();
  }

}
