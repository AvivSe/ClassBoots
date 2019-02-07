import {EventEmitter, Injectable, OnInit, Output} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn:"root"})
export class entitiesService implements OnInit{
    itemList;
    @Output() itemListEmitter: EventEmitter<any> = new EventEmitter<any>();
    constructor(private http: HttpClient){}
    ngOnInit(): void {}

    public getInstitutions(){this.apiRequest(environment.baseUrl + 'api/' + "institution","schools","Institution");}
    public getSchools(id : string){this.apiRequest(environment.baseUrl + 'api/institution/getschools/' + id,"subjects","School");}
    public getSubjects(id : string){this.apiRequest(environment.baseUrl + 'api/school/getsubjects/' + id,"lectures","Subject");}
    public getLectures(id : string){this.apiRequest(environment.baseUrl + 'api/subject/getlectures/' + id,"videos","Lecture");}
    public getVideos(id : string){this.apiRequest(environment.baseUrl + 'api/lecture/getvideos/' + id,"video","Video");}

    apiRequest(request,nextPath,title){
        this.http.get(request).subscribe(data => {
            this.itemListEmitter.emit({title: title,_nextpath : nextPath, _data : data});
        });
    }
}