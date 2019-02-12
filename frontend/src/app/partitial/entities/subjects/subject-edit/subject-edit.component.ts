import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  data;

  constructor(private entitiesService: entitiesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.entitiesService.subjectEmitter.subscribe(data =>{
      this.data = data;
    });
    this.route.params.subscribe(params =>{
      this.entitiesService.getSubject(params['_id']);
    });
  }
  onEdit(editForm){

  }
}
