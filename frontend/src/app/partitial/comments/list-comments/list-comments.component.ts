import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { Comment } from "../comment.model";
import { CommentsService}  from "../comments.service";
import { Subscription } from 'rxjs';
import {MatPaginator} from "@angular/material";
@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  comments:Comment[] = [];
  commentsSub:Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public commentsService : CommentsService) { }

  pageIndex:number = 0;
  pageSize:number = 10;
  lowValue:number = 0;
  highValue:number = 10;

  getPaginatorData(event){
    if(event.pageIndex === this.pageIndex + 1){
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue =  this.highValue + this.pageSize;
    }
    else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
    this.drawComments();
  }

  ngOnInit() {
    this.commentsSub = this.commentsService.getCommentsUpdatedListener().subscribe((comments : Comment[]) =>{
      this.comments = this.helper(comments);
    });
  }

  drawComments() {
    this.comments = this.helper(this.commentsService.getComments());
  }
  helper(comments:Comment[]) {
    let tmp = [];
    for(let i in comments) {
      if(Number.parseInt(i) >= this.lowValue && Number.parseInt(i) < this.highValue) {
        tmp.push(this.commentsService.getComments()[i]);
      }
    }
    return tmp;
  }
  ngOnDestroy(){
    this.commentsSub.unsubscribe();
  }
}
