import {Component, Input, OnInit} from '@angular/core';
import { Comment } from "../comment.model";
import {CommentsService} from "../comments.service";
import {AuthService} from "../../auth/auth.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.css']
})


export class WriteCommentComponent implements OnInit {

  @Input() videoId:string;

  constructor(public commentsService: CommentsService, public authService:AuthService,public socket: Socket) {}

  ngOnInit() {
  }

  onCommentAdded(commentForm) {
    //TODO: TITLE NO MORE THEN 10 CHARS.
    if(commentForm.value.comment.length > 0) {
      const comment: Comment = {
        videoId:this.videoId,
        id:'',
        user: "5c166059d4fb3e3f68460e12",
        title: commentForm.value.comment.split('\n')[0] + "...",
        comment: commentForm.value.comment
      };
      this.commentsService.addComment(comment);
      this.socket.emit('new-comment', this.videoId);
    }
    commentForm.resetForm();
  }
}
