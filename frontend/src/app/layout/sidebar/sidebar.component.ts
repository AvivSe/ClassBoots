import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../partitial/entities/entities.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  public list = '';
  constructor(public entitiesService: entitiesService) {}
  ngOnInit() {
    this.entitiesService.videoListEmitter.subscribe(list =>{
      this.list = list[0]._id;
    })
  }
}
