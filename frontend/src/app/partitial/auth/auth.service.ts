import {Injectable} from "@angular/core";
import {userData} from "./user.model";
import {userLogin} from "./login.model";
import {HttpClient} from "@angular/common/http";


@Injectable({providedIn:"root"})
export class AuthService {
    private token : string;

    getToken(){
        return this.token;
    }
    constructor(private http : HttpClient){

    }
    createUser(userData : userData){
        this.http.post<{token: string}>("http://localhost:8080/api/user/register",userData)
            .subscribe(r =>{
                const token = r.token;
                this.token = token;
            });
    }
    login(userLogin : userLogin){
        this.http.post<{token: string}>("http://localhost:8080/api/user/login",userLogin)
            .subscribe(r =>{
            const token = r.token;
            this.token = token;
        });
    }
}