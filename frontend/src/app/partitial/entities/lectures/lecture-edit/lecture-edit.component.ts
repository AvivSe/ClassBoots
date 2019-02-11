import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lecture-edit',
  templateUrl: './lecture-edit.component.html',
  styleUrls: ['./lecture-edit.component.css']
})
export class LectureEditComponent implements OnInit {
  data;

  constructor(private entitiesService: entitiesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.entitiesService.lectureEmitter.subscribe(data =>{
      this.data = data;
    });
    this.route.params.subscribe(params =>{
      alert(params['_id']);
      this.entitiesService.getLecture(params['_id']);
    });
  }
  onEdit(editForm){

  }
}
