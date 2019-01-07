import { Component, OnInit } from '@angular/core';
import {userLogin} from "../user-box/user-box.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  onLogin(loginForm){
    if(loginForm.invalid)
      return;
    const userLogin : userLogin = {
      email: loginForm.value.loginEmail,
      password: loginForm.value.loginPassword
    };
    console.log(userLogin);
    loginForm.resetForm();
  }

  ngOnInit() {
  }

}
