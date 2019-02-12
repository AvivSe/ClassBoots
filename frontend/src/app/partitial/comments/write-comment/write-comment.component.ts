import { Component, OnInit} from '@angular/core';
import { Comment} from "../comment.model";
import {CommentsService} from "../comments.service";
import {AuthService} from "../../auth/auth.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.css']
})


export class WriteCommentComponent implements OnInit {
  constructor(public commentsService: CommentsService, public authService:AuthService,public socket: Socket) {
  }

  ngOnInit() {
  }

  onCommentAdded(loginForm) {
    //TODO: TITLE NO MORE THEN 10 CHARS.
    if(loginForm.value.comment.length > 0) {
      const comment: Comment = {
        id:'sadf',
        user: this.authService.user.email,
        title: loginForm.value.comment.split('\n')[0] + "...",
        comment: loginForm.value.comment
      };
      this.commentsService.addComment(comment);
      this.socket.emit('new-comment');
    }
    loginForm.resetForm();
  }
}
