import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  private sub: any;

  constructor(private entitiesService : entitiesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>{
      this.entitiesService.getSchools(params['_id']);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
