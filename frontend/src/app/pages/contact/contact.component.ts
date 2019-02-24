import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {AuthService} from "../../partitial/auth/auth.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css','../style.css']
})
export class ContactComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onPost(postForm){
    //TODO: keep the post in the database
    this.authService.createContactPost();
  }

}
