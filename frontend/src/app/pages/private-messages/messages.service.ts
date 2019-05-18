import {EventEmitter, Injectable, OnInit, Output} from "@angular/core";
import {MatSnackBar} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: "root"})
export class MessagesService implements OnInit {
    @Output() MessagesSendEmitter: EventEmitter<any> = new EventEmitter<any>();
    ngOnInit(): void {
    }

    constructor(private matSnackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute, private router: Router) {}


    public sendMessage(msg) {
        this.http.post<{ error: string }>(environment.baseUrl + 'api/user/sendpm',msg).subscribe(data => {
            if(data.error){
                this.MessagesSendEmitter.emit(data);
            }
            else{
                this.matSnackBar.open('Send message success.', null, {duration: 3000});
                this.MessagesSendEmitter.emit({error:false});
            }
        })
    }

}