import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../partitial/auth/auth.service";

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {

  constructor(public authService : AuthService) { }

  ngOnInit() {
  }

}
