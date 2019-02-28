import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  data = { name:'',description:'' };
  currentID : string;
  errorMessage: string;
  error: boolean = false;

  constructor(private entitiesService: entitiesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.entitiesService.subjectEmitter.subscribe(data =>{
      this.entitiesService.subjectEmitter.subscribe(data=>{
        if(data.error()) {
          this.error = true;
          this.errorMessage = data.description;
        }
      });
      if(data.error){
        this.error = true;
        this.errorMessage = data.description;
      }
      else{
        this.data = data;
      }
    });
    this.route.params.subscribe(params =>{
      this.currentID = params['_id'];
      this.entitiesService.getSubject(params['_id']);
    });
  }
  onEdit(editForm){
    if(editForm.value.name != '')
      this.data.name = editForm.value.name;
    if(editForm.value.description != '')
      this.data.description = editForm.value.description;
    this.entitiesService.editSubject(this.data);
  }

  deleteItem() {
    this.entitiesService.deleteElement("subject", this.data, (data) => {
      if (data.error) {
      }
    });
  }
}
