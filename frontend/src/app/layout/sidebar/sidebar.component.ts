import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../partitial/auth/auth.service";
import {entitiesService} from "../../partitial/entities/entities.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  needToLogin : boolean = true;
  public list = '';

  constructor(public authService : AuthService,public entitiesService: entitiesService) {}
  ngOnInit() {
    this.authService.getUser.subscribe(user =>{
      this.needToLogin = false;
    });
    this.entitiesService.videoListEmitter.subscribe(list =>{
      this.list = list[0]._id;
    })
  }
}
