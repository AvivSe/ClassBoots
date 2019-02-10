import {EventEmitter, Injectable, Output} from "@angular/core";
import {userData} from "./user.model";
import {userLogin} from "./login.model";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';


@Injectable({providedIn:"root"})
export class AuthService {
    private token : string;
    public user : userData;
    private isLoggedIn : boolean;
    @Output() getUser : EventEmitter<any> = new EventEmitter<any>();
    @Output() commandSuccess : EventEmitter<any> = new EventEmitter<any>();
    getToken(){
        return this.token;
    }
    getCurrentUser(){
        return this.user;
    }
    isLogged(){
        return this.isLoggedIn
    }
    constructor(private http : HttpClient){
        this.isLoggedIn = false;
    }
    createUser(userData : userData){
        this.http.post<{_token: string,_profile : userData,error : boolean}>(environment.baseUrl + "api/user/register",userData)
            .subscribe(user =>{
                this.token = user._token;
                this.user = user._profile;
                this.getUser.emit(user._profile);
                this.isLoggedIn = true;
                this.commandSuccess.emit();
            });
    }
    login(userLogin : userLogin){
        this.http.post<{_token: string,_profile : userData,error : boolean}>(environment.baseUrl + "api/user/login",userLogin)
            .subscribe(user =>{
                if(!user.error) {
                    this.token = user._token;
                    this.user = user._profile;
                    this.getUser.emit(user._profile);
                    this.isLoggedIn = true;
                    this.commandSuccess.emit();
                }
        });
    }
}
