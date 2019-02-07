import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  private sub: any;

  constructor(private entitiesService : entitiesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
      this.entitiesService.getSubjects(params['_id']);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
