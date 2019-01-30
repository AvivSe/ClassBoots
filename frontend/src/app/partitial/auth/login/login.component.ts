import { Component, OnInit } from '@angular/core';
import {userLogin} from "../login.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService : AuthService) {}

  onLogin(loginForm){
    if(loginForm.invalid)
      return;
    const userLogin : userLogin = {
      email: loginForm.value.loginEmail,
      password: loginForm.value.loginPassword
    };
    this.authService.login(userLogin);
    loginForm.resetForm();
  }

  ngOnInit() {
  }

}
