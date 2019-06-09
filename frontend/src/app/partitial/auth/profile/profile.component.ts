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
    user: userData;
    error: boolean = false;
    errorMsg: string;
    isLoaded: boolean = false;


    constructor(@Inject(MAT_DIALOG_DATA) public data, public http: HttpClient) {
        this.http.get<{ profile: userData, error: boolean }>(environment.baseUrl + "api/user/profile")
            .subscribe(user => {
                if (!user.error) {
                    this.user = user.profile;
                    this.isLoaded = true;
                }
            });
    }

    updateUser(userForm) {
        if (userForm.value.firstName && userForm.value.firstName != '') {
            this.user.firstName = userForm.value.firstName;
        }
        if (userForm.value.lastName && userForm.value.lastName != '') {
            this.user.lastName = userForm.value.lastName;
        }
        if (userForm.value.dob && userForm.value.dob != '') {
            this.user.dob = userForm.value.dob;
        }
        this.http.put<{ profile: userData, error: boolean, description: string }>(environment.baseUrl + "api/user/profile", {
            firstName: this.user.firstName, lastName: this.user.lastName, dob: this.user.dob
        })
            .subscribe(user => {
                if (!user.error) {
                    userForm.reset();
                } else {
                    this.error = true;
                    this.errorMsg = user.description
                }
            });
    }

    updatePassword(passwordForm) {
        if (passwordForm.value.password == passwordForm.value.repassword) {
            this.http.put<{ profile: userData, error: boolean }>(environment.baseUrl + "api/user/profile", {
                password: passwordForm.value.password
            })
                .subscribe(user => {
                    if (!user.error) {
                        passwordForm.reset();
                        this.error = false;
                    }
                })
        } else {
            this.error = true; this.errorMsg = "New password doesnt match!"
        }
    }
}


