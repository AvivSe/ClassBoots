import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-school',
  templateUrl: './create-school.component.html',
  styleUrls: ['./create-school.component.css']
})
export class CreateSchoolComponent implements OnInit {
  currentInstitution: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentInstitution = params['currentId'];
    });
  }

  onCreate(createForm){
    alert(createForm.value.name);
    if(createForm.invalid()) {
      return;
    }
    createForm.resetForm();
  }

}
