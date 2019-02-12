import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../partitial/entities/entities.service";
import {AuthService} from "../../partitial/auth/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  public list = '';

  constructor(public entitiesService: entitiesService,public authService : AuthService) {}
  ngOnInit() {
    this.entitiesService.videoListEmitter.subscribe(list =>{
      this.list = list[0]._id;
    })
  }

  public isLogged() {
    return this.authService.isLogged();
  }
}
