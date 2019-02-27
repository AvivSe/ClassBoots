import { Component, OnInit } from '@angular/core';
import {userData} from "../user.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : userData;
  constructor(public authService : AuthService) {
    this.user = authService.getCurrentUser();
  }
  ngOnInit() {
    this.authService.getUser.subscribe(user=>{
      this.user = user.email;
    })
  }
  updateUser(userForm){
    userForm.resetForm();
  }
}
