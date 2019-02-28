import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../partitial/auth/auth.service";

@Component({
  selector: 'app-please-login',
  templateUrl: './please-login.component.html',
  styleUrls: ['./please-login.component.css', '../../style.css']
})
export class PleaseLoginComponent implements OnInit {

  constructor(public authService : AuthService) {
  }

  ngOnInit() {

  }

}
