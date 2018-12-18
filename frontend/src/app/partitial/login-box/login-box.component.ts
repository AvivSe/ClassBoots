import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {
  loginPassword = '';

  constructor() { }

  onLogin(loginEmail,loginPassword){
    const newLogin = {
      email : loginEmail.value,
      password : loginPassword.value
    }
    console.log(loginEmail.value);
    console.log(loginPassword.value);
  }

  onRegister(emailRegister,passwordRegister,firstNameRegister,lastNameRegister,addressRegister,dateRegister){
    const newUser = {
      email: emailRegister.value,
      password: passwordRegister.value,
      firstName: firstNameRegister.value,
      lastName: lastNameRegister.value,
      address: addressRegister.value,
      date: dateRegister.value
    }
    console.log(newUser);
  }

  ngOnInit() {
  }

}
