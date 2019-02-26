import { Comment } from "./comment.model";
import {EventEmitter, Injectable, Output} from "@angular/core";
import { Subject } from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class CommentsService {
    private comments : Comment[] = [];
    private commentsUpdated = new Subject<Comment[]>();
    private ytComments : Comment[] = [];
    private ytCommentsUpdated = new Subject<Comment[]>();

    constructor(private http: HttpClient, authServer:AuthService){}

    getComments(){
        return this.comments;
    }
    getYtComments(){
        return this.ytComments;
    }

    getCommentsUpdatedListener(){
        return this.commentsUpdated.asObservable();
    }
    getYtCommentsUpdatedListener(){
        return this.ytCommentsUpdated.asObservable();
    }

    addComment(comment : Comment){
        //if(!this.comments.find(c=>c.id==comment.id)) {
        this.http.post(environment.baseUrl+'api/video/addcomment', {
            videoid:comment.videoId,
            user:"5c166059d4fb3e3f68460e12",
            title:comment.title,
            content:comment.comment
        }).subscribe(data =>{
            this.comments = [comment, ...this.comments];
            this.commentsUpdated.next([...this.comments]);
        });

        //}
    }

    notify(videoId) {
        this.http.get(environment.baseUrl+'api/video/'+videoId).subscribe(data =>{
             this.redrawComments(data['comments']);
             this.redrawYoutubeComments(data['ytcomments']);
        });
    }

    redrawComments(comments: any[]) {
        this.comments = [];

        if (comments) {
            comments.forEach(comment => {
                this.comments = [{
                    videoId: comment.videoId,
                    id: comment._id,
                    user: comment.user,
                    title: comment.title,
                    comment: comment.content
                }, ...this.comments];
            });
        }

        this.commentsUpdated.next([...this.comments]);
    }
    redrawYoutubeComments(comments: any[]) {
        this.ytComments = [];
        if (comments) {
            comments.forEach(comment => {
                this.ytComments = [{
                    videoId: comment.videoId,
                    id: comment._id,
                    user: comment.user,
                    title: comment.title,
                    comment: comment.content
                }, ...this.ytComments];
            });
        }

        this.ytCommentsUpdated.next([...this.ytComments]);
    }
}