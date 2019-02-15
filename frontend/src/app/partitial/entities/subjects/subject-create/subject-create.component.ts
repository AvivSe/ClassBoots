import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit {
  currentSchool : string;
  errorMessage: string;
  error: boolean = false;

  constructor(private route: ActivatedRoute,private entitiesService : entitiesService) { }

  ngOnInit() {
    this.entitiesService.subjectEmitter.subscribe(data=>{
      if(data.error){
        this.error = true;
        this.errorMessage = data.description;
      }
    });
    this.route.params.subscribe(params => {
      this.currentSchool = params['currentId'];
    });
  }
  onCreate(createForm){
    this.entitiesService.addSubject({schoolid:this.currentSchool,name:createForm.value.name,description:createForm.value.description});
    createForm.resetForm();
  }


}
