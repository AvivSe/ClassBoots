import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css']
})
export class CreateSchoolComponent implements OnInit {
  currentInstitution: string;
  errorMessage : string;
  error : boolean = false;

  constructor(private route: ActivatedRoute,public entitiesService: entitiesService) { }

  ngOnInit() {
    this.entitiesService.schoolEmitter.subscribe(data=>{
      if(data.error){
        this.error = true;
        this.errorMessage = data.description;
      }
    });
    this.route.params.subscribe(params => {
      this.currentInstitution = params['currentId'];
    });
  }

  onCreate(createForm){
    this.entitiesService.addSchool({institutionid:this.currentInstitution,name:createForm.value.name});
    createForm.resetForm();
  }
}
