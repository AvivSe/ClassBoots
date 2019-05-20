import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material";
import {ContactMessage} from "../../models/ContactMessage.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent implements OnInit {
  messages: ContactMessage[];
  viewMessages: ContactMessage[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

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
    this.http.get(environment.baseUrl + 'api/contact').subscribe(data => {
      this.messages = data as ContactMessage[];
      this.viewMessages = this.helper(this.messages);
    });

  }

  drawComments() {
    this.viewMessages = this.helper(this.messages);
  }

  toggleHandled(id) {
    this.http.get(environment.baseUrl + 'api/contact/toggle/' + id).subscribe()
  }

  helper(messages:ContactMessage[]) {
    let tmp = [];
    for(let i in messages) {
      if(Number.parseInt(i) >= this.lowValue && Number.parseInt(i) < this.highValue) {
        tmp.push(this.messages[i]);
      }
    }
    return tmp;
  }
}
