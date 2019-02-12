import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-institution-edit',
  templateUrl: './institution-edit.component.html',
  styleUrls: ['./institution-edit.component.css']
})
export class InstitutionEditComponent implements OnInit {
  data;

  constructor(private entitiesService: entitiesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.entitiesService.institutionEmitter.subscribe(data =>{
      this.data = data;
    });
    this.route.params.subscribe(params =>{
      this.entitiesService.getInstitution(params['_id']);
    });
  }
  onEdit(editForm){}
}
