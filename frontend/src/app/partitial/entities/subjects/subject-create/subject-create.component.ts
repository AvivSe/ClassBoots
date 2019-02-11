import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-subject-create',
  templateUrl: './subject-create.component.html',
  styleUrls: ['./subject-create.component.css']
})
export class SubjectCreateComponent implements OnInit {
  currentSchool : string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentSchool = params['currentId'];
    });
  }

  onCreate(createForm){
    alert(createForm.value.name);
    createForm.resetForm();
    if(createForm.invalid()) {
      return;
    }
  }


}
