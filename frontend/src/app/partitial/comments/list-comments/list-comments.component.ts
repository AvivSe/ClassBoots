import {Component, OnInit, Input, ViewChild} from '@angular/core';
import { Comment } from "../comment.model";
import { CommentsService}  from "../comments.service";
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogConfig, MatPaginator} from "@angular/material";
import {AuthService} from "../../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {SendPmComponent} from "../../send-pm/send-pm.component";
@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {
  comments:Comment[] = [];
  commentsSub:Subscription;
  @Input() videoId:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public commentsService : CommentsService, public authService: AuthService, public http: HttpClient,public dialog: MatDialog) { }

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

  deleteComment(id: string) {
    this.http.delete(environment.baseUrl + 'api/video/' + this.videoId + '/deletecomment/' + id ).subscribe(()=> {
      this.commentsService.redrawComments(this.commentsService.getComments().filter(comment=>comment.id !== id))
    })
  }

  sendPm(to: string) {

    const config = new MatDialogConfig();
    config.data = { to };

    this.dialog.open(SendPmComponent, config);
  }
}
