import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../partitial/auth/auth.service";
import {entitiesService} from "../../../partitial/entities/entities.service";

@Component({
  selector: 'app-please-login',
  templateUrl: './please-login.component.html',
  styleUrls: ['./please-login.component.css', '../../style.css']
})
export class PleaseLoginComponent implements OnInit {

  constructor(public authService : AuthService,private entitiesService : entitiesService) {
    this.authService.getUser.subscribe(()=>{
      this.entitiesService.applyRedirectUrl();
    })
  }

  ngOnInit() {

  }

}
