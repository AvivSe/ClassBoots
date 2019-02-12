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

    this.socket.on('new-comment', function(x){
      console.log("New Comment: " + JSON.stringify(x));
    });
  }

  ngOnInit() {
    this.entitiesService.videoEmitter.subscribe(video =>{
      let comments = [];


      if(video.comments) {
        video.comments.forEach(comment => {
          comments.push({
            id: comment._id,
            user: comment.user,
            title: comment.title,
            comment: comment.content
          });
        });
      }
      if(comments) {
        this.commentsService.redrawComments(comments);
      }
    });

    this.route.params.subscribe(params => {
      this.entitiesService.getVideo(params['_id']);
    });
  }

  ngOnDestroy(): void {
  }
}
