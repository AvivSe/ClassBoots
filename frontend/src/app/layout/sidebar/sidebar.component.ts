import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../partitial/auth/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  needToLogin : boolean = true;

  constructor(public authService : AuthService) {}
  ngOnInit() {
    this.authService.getUser.subscribe(user =>{
      this.needToLogin = false;
    })  }

}
