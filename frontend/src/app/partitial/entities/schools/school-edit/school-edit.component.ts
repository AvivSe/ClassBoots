import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.css']
})
export class SchoolEditComponent implements OnInit {
  data;

  constructor(private entitiesService: entitiesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.entitiesService.schoolEmitter.subscribe(data =>{
      this.data = data;
    });
    this.route.params.subscribe(params =>{
      this.entitiesService.getSchool(params['_id']);
    });
  }
  onEdit(editForm){

  }
}
