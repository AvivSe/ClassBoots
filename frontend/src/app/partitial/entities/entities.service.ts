import {EventEmitter, Injectable, OnInit, Output} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn:"root"})
export class entitiesService implements OnInit{
    itemList;
    @Output() itemListEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() videoListEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() videoEmitter: EventEmitter<any> = new EventEmitter<any>();
    constructor(private http: HttpClient){}
    ngOnInit(): void {}

    public getInstitutions(){this.apiRequest(environment.baseUrl + 'api/' + "institution","schools","Institution");}
    public getSchools(_id){this.apiRequest(environment.baseUrl + 'api/' + "institution/getschools/"+_id,"subjects","Schools");}
    public getSubjects(_id){this.apiRequest(environment.baseUrl + 'api/' + "school/getsubjects/"+_id,"lectures","Subjects");}
    public getLectures(_id){this.apiRequest(environment.baseUrl + 'api/' + "subject/getlectures/"+_id,"Video","Lectures");}
    public getVideo(_id){
        this.http.get(environment.baseUrl + 'api/lecture/getvideos/'+_id).subscribe(data => {
            this.videoEmitter.emit(data[0]);
            this.videoListEmitter.emit(data);
        });
    }

    apiRequest(request,nextPath,title){
        this.http.get(request).subscribe(data => {
            this.itemListEmitter.emit({title: title,_nextpath : nextPath, _data : data});
        });
    }


}