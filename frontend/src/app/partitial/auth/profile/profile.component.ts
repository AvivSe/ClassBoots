import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {AuthService} from "../auth.service";
import {userData} from "../user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user : userData;
  constructor(@Inject(MAT_DIALOG_DATA) public data,public authService : AuthService) {
    this.user = authService.getCurrentUser();
    console.log(this.user);
  }
  ngOnInit() {
    this.authService.getUser.subscribe(user=>{
      console.log(user);
      this.user = user.email;
    })
  }
  updateUser(userForm){
    userForm.resetForm();
  }
}


