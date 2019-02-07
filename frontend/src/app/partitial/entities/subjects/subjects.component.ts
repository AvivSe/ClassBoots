import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
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
