//TODO: DUPLICATE CODE

import { Component, OnInit } from '@angular/core';
import {userLogin} from "../login.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
  constructor(public authService : AuthService) { }
  user : userLogin;
  errorMessage : string;
  error : boolean = false;
  createNewAccount : boolean = false;

  ngOnInit() {
    this.authService.getUser.subscribe(error =>{
      if(error.error){
        this.errorMessage = error.description;
        this.error = true;
        if(this.user.email && this.user.password){
          this.createNewAccount = true;
        }
      }
      else{
        this.errorMessage = '';
      }
    })
  }
  onLogin(userForm){
    if(userForm.invalid)
      return;
    this.user = {
      email: userForm.value.loginEmail,
      password: userForm.value.loginPassword
    };
      this.authService.login(this.user);
  }

  onRegister(){
    if(this.user.email && this.user.password){
      this.authService.createUser(this.user)
    }
  }
}
