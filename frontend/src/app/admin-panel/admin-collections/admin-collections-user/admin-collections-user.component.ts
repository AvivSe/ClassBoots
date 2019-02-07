import { Component, OnInit } from '@angular/core';
import {AdminAgGridService} from "../admin-ag-grid.service";

@Component({
  selector: 'app-admin-collections-user',
  templateUrl: './admin-collections-user.component.html',
  styleUrls: ['./admin-collections-user.component.css']
})
export class AdminCollectionsUserComponent implements OnInit {

  constructor(public agGridService : AdminAgGridService) { }

  ngOnInit() {
    this.agGridService.users();
  }

}
