import { Component, OnInit } from '@angular/core';
import {Message} from '../../models/message.model'
@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.css']
})
export class PrivateMessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor() {
    this.messages.push({from: "from1", to:"to1", title:"title1", content: "content1",  date: "date1"});
    this.messages.push({from: "from2", to:"to2", title:"title2", content: "content2",  date: "date2"});
    this.messages.push({from: "from3", to:"to3", title:"title3", content: "content3",  date: "date3"});
    this.messages.push({from: "from4", to:"to4", title:"title4", content: "content4",  date: "date4"});
    this.messages.push({from: "from5", to:"to5", title:"title5", content: "content5",  date: "date5"});
    this.messages.push({from: "from6", to:"to6", title:"title6", content: "content6",  date: "date6"});

  }

  ngOnInit() {
  }

}
