import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../partitial/auth/auth.service";
import {userData} from "../../partitial/auth/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : userData;
  loginName = '';
  ngOnInit() {
  }
  constructor(public authService : AuthService){
    authService.getUser.subscribe(user =>{
      this.user = user;
      this.loginName = this.user.email;
    });
  }
}
