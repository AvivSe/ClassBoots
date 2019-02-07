import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {
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
