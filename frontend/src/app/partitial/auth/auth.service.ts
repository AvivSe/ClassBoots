import {EventEmitter, Injectable, Output} from "@angular/core";
import {userData} from "./user.model";
import {userLogin} from "./login.model";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {Subject} from "rxjs";
import {local} from "d3-selection";


@Injectable({providedIn:"root"})
export class AuthService {
    @Output() getUser : EventEmitter<any> = new EventEmitter<any>();
    @Output() commandSuccess : EventEmitter<any> = new EventEmitter<any>();

    private token : string;
    public user : userData;
    private isLoggedIn : boolean = false;
    private isAdmin: boolean = false;
    private isSidebarCollapsed: boolean = false;
    private redirectUrl: string = '';
    private authStatusListener = new Subject<boolean>();
    private sidebarStatus = new Subject<boolean>();
    private redirectTo = new Subject<string>();

    getToken(){
        return this.token;
    }
    getCurrentUser(){
        return this.user;
    }
    isLogged(){
        return this.isLoggedIn;
    }

    getIsSidebarCollapsed() {
        return this.isSidebarCollapsed && this.isLoggedIn;
    }

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        this.sidebarStatus.next(this.isSidebarCollapsed);
    }

    public getRedirectUrl() {
        return this.redirectUrl;
    }

    public setRedirectUrl(url) {
        this.redirectUrl = url;
        this.redirectTo.next(url);
    }
    getIsAdmin() {
        return this.isAdmin;
    }
    constructor(private http : HttpClient){
        this.isLoggedIn = false;
        this.isAdmin = false;
    }
    createUser(userData : userData){
        this.http.post<{_token: string,_profile : userData,error : boolean}>(environment.baseUrl + "api/user/register",userData)
            .subscribe(user =>{
                if(!user.error) {
                    this.token = user._token;
                    this.user = user._profile;
                    this.getUser.emit(user._profile);
                    this.isLoggedIn = true;
                    this.commandSuccess.emit();
                }
                else{
                    this.getUser.emit(user);
                }
            });
    }
    login(userLogin : userLogin){
        this.http.post<{_token: string,_profile : userData,error : boolean}>(environment.baseUrl + "api/user/login",userLogin)
            .subscribe(user =>{
                if(!user.error) {
                    this.token = user._token;
                    this.user = user._profile;
                    this.getUser.emit(user._profile);
                    this.isAdmin = user._profile.role === "admin";
                    this.isLoggedIn = true;
                    this.authStatusListener.next(true);
                    this.sidebarStatus.next(true);
                    this.isSidebarCollapsed = true;
                    this.saveAuthData(user._token, JSON.stringify(user._profile));
                    this.commandSuccess.emit();
                }
                else{
                    this.getUser.emit(user);
                }
        });
    }

    logout() {
        this.token = null;
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.sidebarStatus.next(false);
        this.isSidebarCollapsed = false;
        this.clearAuthData();
        this.authStatusListener.next(false);
    }

    saveAuthData(token: string, profile:string) {
        localStorage.setItem('token', token);
        localStorage.setItem('profile', profile);
        //localStorage.setItem('expiration', expirationDate.toISOString());
    }
    clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        //localStorage.removeItem('expiration');
    }
    autoAuthUser() {
        const  autoInformation = this.getAuthData();
        if(!autoInformation) {
            return;
        }
        const date = new Date();
        //const isInFuture = autoInformation.expire  > date;
        //if(isInFuture) {

        this.token = autoInformation.token;
        this.user = JSON.parse(autoInformation.profile);
        this.isLoggedIn = true;
        this.authStatusListener.next(true);

        this.getUser.emit({email: this.user.email, role:this.user.role });
        this.isAdmin = this.user.role === "admin";
        this.isLoggedIn = true;
        this.authStatusListener.next(true);
        this.sidebarStatus.next(true);
        this.isSidebarCollapsed = true;
        //}
    }
    getAuthData() {
        const token = localStorage.getItem('token');
        //const expiration = localStorage.getItem('expiration');
        const profile = localStorage.getItem('profile');

        if(!token && !profile) {
            return;
        }

        return {
            token: token,
            profile: profile
        }
    }
}
