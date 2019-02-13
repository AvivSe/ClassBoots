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
  errorMessage : string;
  error : boolean = false;

  ngOnInit() {
    this.authService.getUser.subscribe(error => {
      if (error.error) {
        this.errorMessage = error.description;
        this.error = true;
      } else {
        this.errorMessage = '';
      }
    })
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
      role: "user",
      firstname: registerForm.value.registerFirstName,
      lastname: registerForm.value.registerLastName,
      DOB: registerForm.value.registerDOB
    };
    this.authService.createUser(userData);
    registerForm.resetForm();
  }
}
