import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {userData} from "../user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user : userData = null;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public http: HttpClient) {
    this.http.get<{profile: userData, error : boolean}>(environment.baseUrl + "api/user/profile")
        .subscribe(user =>{
          if(!user.error) {
            this.user = user.profile;
            console.log(this.user);
          }
        });
  }

  updateUser(userForm){
    userForm.resetForm();
  }
}


