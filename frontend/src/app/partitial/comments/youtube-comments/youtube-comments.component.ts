import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material";

@Component({
  selector: 'app-youtube-comments',
  templateUrl: './youtube-comments.component.html',
  styleUrls: ['./youtube-comments.component.css']
})
export class YoutubeCommentsComponent implements OnInit {
  @Input() comments: any[];
  @Input() TotalComments: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageIndex:number = 0;
  pageSize:number = 10;
  lowValue:number = 0;
  highValue:number = 10;

  constructor() { }

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
    this.drawComments();
  }

  drawComments() {
    this.comments = this.helper(this.TotalComments);
  }
  helper(comments: any[]) {
    let tmp = [];
    for(let i in comments) {
      if(Number.parseInt(i) >= this.lowValue && Number.parseInt(i) < this.highValue) {
        tmp.push(this.TotalComments[i]);
      }
    }
    return tmp;
  }
}
