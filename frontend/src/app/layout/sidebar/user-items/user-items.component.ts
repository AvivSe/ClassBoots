import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../partitial/auth/auth.service";
import {ProfileComponent} from "../../../partitial/auth/profile/profile.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {

  constructor(public authService : AuthService,public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(ProfileComponent, {width: '60vw'});
  }
}
