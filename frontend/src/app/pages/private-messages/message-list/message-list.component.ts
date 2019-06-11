import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Message } from "../../../models/message.model";
import {MatPaginator} from "@angular/material";
import {CommentsService} from "../../../partitial/comments/comments.service";
import {entitiesService} from "../../../partitial/entities/entities.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() messages: Message[];
  @Input() themeColor;
  viewMessages: Message[];

  @Input() isInbox: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public commentsService : CommentsService, public entitiesService:entitiesService) {
  }

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
      this.viewMessages = this.helper(this.messages);

  }

  drawComments() {
    this.viewMessages = this.helper(this.messages);
  }

  helper(messages:Message[]) {
    let tmp = [];
    for(let i in messages) {
      if(Number.parseInt(i) >= this.lowValue && Number.parseInt(i) < this.highValue) {
        tmp.push(this.messages[i]);
      }
    }
    return tmp;
  }

}
