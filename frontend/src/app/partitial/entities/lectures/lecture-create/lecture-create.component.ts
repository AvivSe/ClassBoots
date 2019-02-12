import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lecture-create',
  templateUrl: './lecture-create.component.html',
  styleUrls: ['./lecture-create.component.css']
})
export class LectureCreateComponent implements OnInit {
  currentSubject : string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentSubject = params['currentId'];
    });
  }

  onCreate(createForm){
    alert(this.currentSubject);
    alert(createForm.value.name);
    createForm.resetForm();
    if(createForm.invalid()) {
      return;
    }
  }

}
