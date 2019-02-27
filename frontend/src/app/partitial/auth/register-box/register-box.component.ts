import { Component, OnInit } from '@angular/core';
import {userData} from "../user.model";
import {AuthService} from "../auth.service";
import {userLogin} from "../login.model";

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
    const userData : userLogin = {
      //TODO: FIX THE REG DATE
      email: registerForm.value.registerEmail,
      password: registerForm.value.registerPassword
    };
    this.authService.createUser(userData);
    registerForm.resetForm();
  }
}
