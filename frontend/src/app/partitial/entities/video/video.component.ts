import { Component, OnInit,OnDestroy } from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentsService} from "../../comments/comments.service";
import {AuthService} from "../../auth/auth.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css' , './rating-template.css']
})
export class VideoComponent implements OnInit,OnDestroy {
  currentLecture = {name: '',_id: '',description: '',lecturer: '',date: ''};
  currentVideo = {reference: '',_id: '',position: '',views: ''};
  currentRate: Number = 0;
  isVideoLoaded : boolean = false;

  constructor(public entitiesService : entitiesService,
              private route: ActivatedRoute,
              public commentsService: CommentsService,
              public authService:AuthService,
              public socket: Socket) {
    this.socket.on('new-comment', function(videoId){
      commentsService.notify(videoId);
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.entitiesService.getLecture(params['_id']);
    });
    this.entitiesService.lectureEmitter.subscribe(lecture =>{
      this.currentLecture = lecture;
      this.entitiesService.changeSideBarEmitter.emit(lecture._id)
    });
    this.entitiesService.videoEmitter.subscribe(video =>{
      this.currentVideo = video;
      this.isVideoLoaded = true;
      this.commentsService.notify(video._id);
    });
  }

  onRatingClicked(value) {
     console.log("Rating is: " + (value+1));
  }

  ngOnDestroy(): void {
    this.entitiesService.changeSideBarEmitter.emit(null);
  }
}
