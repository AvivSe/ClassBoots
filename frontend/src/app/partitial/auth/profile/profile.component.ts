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
          }
        });
  }

  updateUser(userForm){
      if(userForm.value.firstName && userForm.value.firstName != ''){
          this.user.firstName = userForm.value.firstName;
      }
      if(userForm.value.lastName && userForm.value.lastName != ''){
          this.user.lastName = userForm.value.lastName;
      }
      if(userForm.value.dob && userForm.value.dob != ''){
          this.user.dob = userForm.value.dob;
      }
      this.http.post<{profile: userData, error : boolean}>(environment.baseUrl + "api/user/profile",{
          firstName: this.user.firstName,lastName: this.user.lastName,dob:this.user.dob
      })
          .subscribe(user =>{
              if(!user.error) {
                  this.user = user.profile;
              }
          });
      userForm.reset();
  }

  updatePassword(passwordForm){
      console.log(passwordForm.value)
  }
}


