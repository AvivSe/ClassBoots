import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentsService} from "../../comments/comments.service";
import {AuthService} from "../../auth/auth.service";
import {Socket} from "ngx-socket-io";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css' , './rating-template.css']
})
export class VideoComponent implements OnInit,OnDestroy {
  currentVideo = {reference: '',_id:'',lectureid:'',ytcomment: [],views:'',position:''};
  currentRate: Number = 0;
  isVideoLoaded : boolean = false;
  videoId: string = '';
  checked : boolean = false;
  isLoaded: boolean = false;
  dislikes: string[] = [];
  likes: string[] = [];
  currentUserId: string;
  myLikeState: string = "none";

  constructor(public entitiesService : entitiesService,
              private route: ActivatedRoute,
              private http: HttpClient,
              public commentsService: CommentsService,
              public authService:AuthService,
              public socket: Socket,
              private router : Router
              ) {
    this.socket.on('new-comment', function(videoId){
      commentsService.notify(videoId);
    });

    this.currentUserId = this.authService.getCurrentUserId();
  }

  ngOnInit() {
    this.videoId = this.route.snapshot.params.videoId;
    this.http.get<{reference:string,_id:string,lectureid:string,ytcomment:[],views:string,position:string, likes: string[], dislikes:string[]}>(environment.baseUrl + 'api/video/' + this.route.snapshot.params.videoId).subscribe(data => {
      this.likes = data.likes;
      this.dislikes = data.dislikes;
      this.currentVideo = data;
      this.isVideoLoaded=true;
      this.commentsService.notify(this.currentVideo._id);
      this.entitiesService.changeSideBarEmitter.emit(this.currentVideo.lectureid);
      this.isLoaded = true;

      if(this.likes.find(string=>string==this.currentUserId)) {
        this.myLikeState = "like"
      }
      if(this.dislikes.find(string=>string==this.currentUserId)) {
        this.myLikeState = "dislike"
      }

    });
  }

  onLikeClicked() {
    this.updateLikes("like");
  }
  onDisLikeClicked() {
    this.updateLikes("dislike");
  }
  onUnLikeClicked() {
    this.updateLikes("unlike");
  }
  onUnDisLikeClicked() {
    this.updateLikes("undislike");
  }


  updateLikes(action) {
    this.http.get<{likes: string[], dislikes:string[]}>(environment.baseUrl + 'api/video/' + this.route.snapshot.params.videoId + '/' + action).subscribe(data => {
      this.likes = data.likes;
      this.dislikes = data.dislikes;
      this.myLikeState = "none";

      if(this.likes.find(string=>string==this.currentUserId)) {
        this.myLikeState = "like"
      }
      if(this.dislikes.find(string=>string==this.currentUserId)) {
        this.myLikeState = "dislike"
      }

    });
  }
  ngOnDestroy(): void {
  }
  setRedirect() {
    this.entitiesService.setRedirectUrl(this.router.routerState.snapshot);
    this.router.navigate(['Video/edit/',this.videoId]);
  }
}
