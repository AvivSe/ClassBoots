import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-lecture-create',
  templateUrl: './lecture-create.component.html',
  styleUrls: ['./lecture-create.component.css']
})
export class LectureCreateComponent implements OnInit {
  currentSubject : string;
  errorMessage : string;
  error : boolean = false;

  constructor(private route: ActivatedRoute,private entitiesService:entitiesService) { }

  ngOnInit() {
    this.entitiesService.lectureEmitter.subscribe(data=>{
      if(data.error){
        this.error = true;
        this.errorMessage = data.description;
      }
    });
    this.route.params.subscribe(params => {
      this.currentSubject = params['currentId'];
    });
  }

  onCreate(createForm) {
    this.entitiesService.addLecture({
      subjectid:this.currentSubject,
      name:createForm.value.name,
      description:createForm.value.description,
      lecturer:createForm.value.lecturer,
      date:createForm.value.date
    });
    createForm.resetForm();
  }
}
