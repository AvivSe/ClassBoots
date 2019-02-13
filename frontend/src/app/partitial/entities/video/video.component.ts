import { Component, OnInit,OnDestroy } from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute} from "@angular/router";
import {CommentsService} from "../../comments/comments.service";
import {AuthService} from "../../auth/auth.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css' , './rating-template.css']
})
export class VideoComponent implements OnInit,OnDestroy {
  currentRate: Number = 0;

  onRatingClicked(value) {
    console.log("Rating is: " + (value+1));
  }

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
    this.entitiesService.videoEmitter.subscribe(video =>{
      this.commentsService.notify(video._id)
    });

    this.route.params.subscribe(params => {
      this.entitiesService.getVideo(params['_id']);
    });
  }

  ngOnDestroy(): void {
  }
}
