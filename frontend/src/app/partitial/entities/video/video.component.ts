import {Component, OnInit, OnDestroy} from '@angular/core';
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
  currentVideo: any;
  currentRate: Number = 0;
  isVideoLoaded : boolean = false;
  videoId: string = '';

  constructor(public entitiesService : entitiesService,
              private route: ActivatedRoute,
              private http: HttpClient,
              public commentsService: CommentsService,
              public authService:AuthService,
              public socket: Socket,
              ) {
  }

  ngOnInit() {
    this.videoId = this.route.snapshot.params.videoId;
    this.http.get(environment.baseUrl + 'api/video/' + this.route.snapshot.params.videoId).subscribe(data => {
      this.currentVideo = data;
      this.isVideoLoaded=true;
      this.commentsService.notify(this.currentVideo._id);
      this.entitiesService.changeSideBarEmitter.emit(this.currentVideo.lectureid)
    });

    this.socket.on('new-comment', function(videoId){
      this.commentsService.notify(videoId);
    });
  }

  onRatingClicked(value) {
     console.log("Rating is: " + (value+1));
  }

  ngOnDestroy(): void {
    this.entitiesService.changeSideBarEmitter.emit(null);
  }


}
