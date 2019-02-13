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
  errorMessage : string;
  error : boolean = false;

  ngOnInit() {
    this.authService.getUser.subscribe(error =>{
      if(error.error){
        this.errorMessage = error.description;
        this.error = true;
      }
      else{
        this.errorMessage = '';
      }
    })
  }
  onLogin(loginForm){
    if(loginForm.invalid)
      return;
    const userLogin : userLogin = {
      email: loginForm.value.loginEmail,
      password: loginForm.value.loginPassword
    };
    this.authService.login(userLogin);
    //loginForm.resetForm();
  }
}
