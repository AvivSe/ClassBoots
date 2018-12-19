import { Component, OnInit } from '@angular/core';
import {userLogin, userRegister} from "./user-box.model";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.css']
})

export class UserBoxComponent implements OnInit {

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

  onRegister(registerForm) {
    if(registerForm.invalid)
      return;
    const userRegister : userRegister = {
      //TODO: FIX THE REG DATE
      email: registerForm.value.registerEmail,
      password: registerForm.value.registerPassword,
      regDate: registerForm.value.registerDOB,
      address: registerForm.value.registerAddress,
      rule: "user",
      firstname: registerForm.value.registerFirstName,
      lastname: registerForm.value.registerLastName,
      DOB: registerForm.value.registerDOB
    };
    console.log(userRegister);
    registerForm.resetForm();
  }

  ngOnInit() {}
}
