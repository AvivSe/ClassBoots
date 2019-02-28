import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.css']
})
export class SchoolEditComponent implements OnInit {
  data = { name: '' };
  currentID : string;
  errorMessage: string;
  error: boolean = false;

  constructor(private entitiesService: entitiesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.entitiesService.schoolEmitter.subscribe(data =>{
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
      this.entitiesService.getSchool(params['_id']);
    });
  }
  onEdit(editForm){
    if(editForm.value.name != '')
      this.data.name = editForm.value.name;
    this.entitiesService.editSchool(this.data);
  }

  deleteItem() {
    this.entitiesService.deleteElement("school", this.data, (data) => {
      if (data.error) {
      }
    });
  }
}
