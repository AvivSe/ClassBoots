import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-institution-create',
  templateUrl: './institution-create.component.html',
  styleUrls: ['./institution-create.component.css']
})
export class InstitutionCreateComponent implements OnInit {
  title = {title: "Institution"};
  constructor(public authService : AuthService,private route: ActivatedRoute) { }
  ngOnInit() {}
  onCreate(createForm){
    if(createForm.invalid)
      return;
    createForm.resetForm();
  }

}
