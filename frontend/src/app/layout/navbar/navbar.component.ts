import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLoginButton = '';

  constructor() {
    if(true){
      this.userLoginButton = "Login";
    }
  }

  ngOnInit() {
  }

}
