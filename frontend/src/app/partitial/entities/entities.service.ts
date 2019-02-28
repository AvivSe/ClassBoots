import {EventEmitter, Injectable, OnInit, Output} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Injectable({providedIn: "root"})
export class entitiesService implements OnInit {
    itemList;
    redirectUrl;

    constructor(private matSnackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
    }

    //GET ALL (EVENT EMITTERS)
    @Output() itemListEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() videoListEmitter: EventEmitter<any> = new EventEmitter<any>();

    //GET SINGLE (EVENT EMITTERS)
    @Output() institutionEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() schoolEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() subjectEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() lectureEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() videoEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() changeSideBarEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() SearchEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() statisticsEmitter: EventEmitter<any> = new EventEmitter<any>();

    //GET ALL (FUNCTIONS)
    public getInstitutions() {
        this.apiRequest(environment.baseUrl + 'api/' + "institution", "institution", "Institution", "Institution", false);
    }

    public getSchools(_id) {
        this.apiRequest(environment.baseUrl + 'api/' + "institution/getschools/" + _id, "school", "School", _id, true);
    }

    public getSubjects(_id) {
        this.apiRequest(environment.baseUrl + 'api/' + "school/getsubjects/" + _id, "subject", "Subject", _id, true);
    }

    public getLectures(_id) {
        this.apiRequest(environment.baseUrl + 'api/' + "subject/getlectures/" + _id, "lecture", "Lecture", _id, true);
    }

    public getPlaylistByLectureId(_id, next) {
        this.http.get(environment.baseUrl + 'api/lecture/getvideos/' + _id).subscribe(data => {
            next(data);
        });
    }
    //API REQUEST FUNCTIONS
    apiRequest(request, nextPath, title, currentId, enableAdd: boolean) {
        this.http.get(request).subscribe(data => {
            this.itemListEmitter.emit({
                title: title,
                _nextpath: nextPath,
                _data: data,
                currentId: currentId,
                enableAdd: enableAdd
            });
        });
    }


    //GET SINGLE FUNCTIONS
    public getInstitution(_id) {
        this.http.get(environment.baseUrl + 'api/institution/' + _id).subscribe(data => {
            this.institutionEmitter.emit(data);
        });
    }

    public getSchool(_id) {
        this.http.get(environment.baseUrl + 'api/school/' + _id).subscribe(data => {
            this.schoolEmitter.emit(data);
        })
    }

    public getSubject(_id) {
        this.http.get(environment.baseUrl + 'api/subject/' + _id).subscribe(data => {
            this.subjectEmitter.emit(data);
        })
    }

    public getLecture(_id) {
        this.http.get(environment.baseUrl + 'api/lecture/' + _id).subscribe(data => {
            this.lectureEmitter.emit(data);
        })
    }

    public getVideo(_id) {
        this.http.get<{ reference: string, views }>(environment.baseUrl + 'api/video/' + _id).subscribe(data => {
            data.views++;
            this.videoEmitter.emit(data);
            this.updateViews(data);
        })
    }


    //ADD SINGLE
    public addSchool(School) {
        this.http.post<{ error: string }>(environment.baseUrl + 'api/school', School).subscribe(data => {
            if (data.error) {
            } else {
                this.applyRedirectUrl();
                this.matSnackBar.open('School added.', null, {duration: 3000});
            }
        })
    }

    public addSubject(Subject) {
        this.http.post<{ error: string }>(environment.baseUrl + 'api/subject', Subject).subscribe(data => {
            if (data.error) {
            } else {
                this.applyRedirectUrl();
                this.matSnackBar.open('Subject added.', null, {duration: 3000});
            }
        })
    }

    public addLecture(Lecture) {
        this.http.post<{ error: string }>(environment.baseUrl + 'api/lecture', Lecture).subscribe(data => {
            if (data.error) {
                this.lectureEmitter.emit(data);
            } else {
                this.applyRedirectUrl();
                this.matSnackBar.open('Lecture added.', null, {duration: 3000});
            }
        })
    }

    public addVideo(Video) {
        this.http.post<{ error: string }>(environment.baseUrl + 'api/video', Video).subscribe(data => {
            if (data.error) {
                this.videoEmitter.emit(data);
            } else {
                this.applyRedirectUrlVideo();
                this.matSnackBar.open('Video added.', null, {duration: 3000});
            }
        })
    }


    //EDIT SINGLE
    public editInstitution(Institution) {
        this.http.put<{ error: boolean }>(environment.baseUrl + 'api/institution', Institution).subscribe(data => {
            if (data.error) {
                this.institutionEmitter.emit(data);
            } else {
                this.applyRedirectUrl();
                this.matSnackBar.open('Institution updated.', null, {duration: 3000});
            }
        })
    }

    public editSchool(School) {
        this.http.put<{ error: boolean }>(environment.baseUrl + 'api/school', School).subscribe(data => {
            if (data.error) {
                this.schoolEmitter.emit(data);
            } else {
                this.applyRedirectUrl();
                this.matSnackBar.open('School updated.', null, {duration: 3000});
            }
        })
    }

    public editSubject(Subject) {
        this.http.put<{ error: boolean }>(environment.baseUrl + 'api/subject', Subject).subscribe(data => {
            if (data.error) {
                this.subjectEmitter.emit(data);
            } else {
                this.applyRedirectUrl();
                this.matSnackBar.open('Subject updated.', null, {duration: 3000});
            }
        })
    }

    public editLecture(Lecture) {
        this.http.put<{ error: boolean }>(environment.baseUrl + 'api/lecture', Lecture).subscribe(data => {
            if (data.error) {
                this.lectureEmitter.emit(data);
            } else {
                this.applyRedirectUrl();
                this.matSnackBar.open('Lecture updated.', null, {duration: 3000});
            }
        })
    }


    public updateViews(Video) {
        this.http.put(environment.baseUrl + 'api/video', Video).subscribe();
    }

    public editVideo(Video) {
        this.http.put<{ error: boolean }>(environment.baseUrl + 'api/video', Video).subscribe(data => {
            if (data.error) {
                this.videoEmitter.emit(data);
            } else {
                this.applyRedirectUrlVideo();
                this.matSnackBar.open('Video updated.', null, {duration: 3000});
            }
        })
    }

    //ALGORITHMS
    public getStatistics(next) {
        this.http.get<{ error: boolean }>(environment.baseUrl + 'api/search/statistic').subscribe(data => {
            next(data);
        })
    }
    public ahoAlgorithm(words,next){
        this.http.post<{error:boolean}>(environment.baseUrl+'api/search/words',words).subscribe(data=>{
            next(data);
        })
    }

    public getSchoolsGroupBy(next){
        this.http.get<{error:boolean}>(environment.baseUrl+'api/institution/getschoolsgs').subscribe(data=>{
            next(data);
        })
    }
    findLecture(searchData){
        this.http.post(environment.baseUrl+"api/search", searchData).subscribe(data => {
            this.SearchEmitter.emit(data)
        });
    }
    //SET GET AND APPLY REDIRECT URL
    public getRedirectUrl() {
        return this.redirectUrl;
    }

    public applyRedirectUrl() {
        setTimeout(function(){
            this.router.navigate([this.getRedirectUrl()]);
        }.bind(this), 1000);
    }
    public applyRedirectUrlVideo() {
        setTimeout(function () {
            this.router.navigateByUrl(this.getRedirectUrl());
        }.bind(this), 1000);
    }

    public setRedirectUrl(url) {
        this.redirectUrl = url.url;
    }


    //DELETE ELEMENT
    public deleteElement(title,element,next) {
        this.http.request<{ error: boolean }>('delete',environment.baseUrl + 'api/'+title,{body:element}).subscribe(data => {
            if(data.error){
            }
            else{
                this.applyRedirectUrl();
                this.matSnackBar.open(title+' Deleted', null, {duration: 3000});
            }
        });
    }
}

