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
  }

  ngOnInit() {
    this.videoId = this.route.snapshot.params.videoId;
    this.http.get<{reference:string,_id:string,lectureid:string,ytcomment:[],views:string,position:string}>(environment.baseUrl + 'api/video/' + this.route.snapshot.params.videoId).subscribe(data => {
      this.currentVideo = data;
      this.isVideoLoaded=true;
      this.commentsService.notify(this.currentVideo._id);
      this.entitiesService.changeSideBarEmitter.emit(this.currentVideo.lectureid);
      this.isLoaded = true;
    });
  }

  onRatingClicked(value) {
     console.log("Rating is: " + (value+1));
  }

  ngOnDestroy(): void {
  }
  setRedirect() {
    this.entitiesService.setRedirectUrl(this.router.routerState.snapshot);
    this.router.navigate(['Video/edit/',this.videoId]);
  }
}
