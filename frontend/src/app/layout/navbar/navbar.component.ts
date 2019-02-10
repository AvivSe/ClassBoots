import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../partitial/auth/auth.service";
import {userData} from "../../partitial/auth/user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ngOnInit() {}
  constructor() {}
}
