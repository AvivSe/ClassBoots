import {Component, OnInit, Input} from '@angular/core';
import {Comment} from "../comment.model";
import { CommentsService}  from "../comments.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  comments:Comment[] = [];
  commentsSub:Subscription;

  constructor(public commentsService : CommentsService) { }

  ngOnInit() {
    this.comments = this.commentsService.getComments();
    this.commentsSub = this.commentsService.getCommentsUpdatedListener().subscribe((comments : Comment[]) =>{
      this.comments = comments;
    })
  }

  ngOnDestroy(){
    this.commentsSub.unsubscribe();
  }
}
