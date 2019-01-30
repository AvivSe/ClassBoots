import { Component, OnInit } from '@angular/core';
import {userData} from "../user.model";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register-box',
  templateUrl: './register-box.component.html',
  styleUrls: ['./register-box.component.css']
})
export class RegisterBoxComponent implements OnInit {

  constructor(public authService : AuthService) {}
  ngOnInit() {
  }

  onRegister(registerForm) {
    if(registerForm.invalid)
      return;
    const userData : userData = {
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
    this.authService.createUser(userData);
    registerForm.resetForm();
  }
}
