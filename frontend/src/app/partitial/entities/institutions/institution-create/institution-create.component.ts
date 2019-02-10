import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-institution-create',
  templateUrl: './institution-create.component.html',
  styleUrls: ['./institution-create.component.css']
})
export class InstitutionCreateComponent implements OnInit {
  title = {title: "Institution"};

  constructor(public authService : AuthService) { }
  ngOnInit() {
  }
  onCreate(createForm){
    if(createForm.invalid)
      return;
  }

}
