import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../partitial/auth/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  isListLoaded : boolean = false;

  constructor(public authService : AuthService) {

  }
  ngOnInit() {
  }

}
