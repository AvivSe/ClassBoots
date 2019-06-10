import { Component, OnInit } from '@angular/core';
import {Message} from '../../models/message.model'
import {AuthService} from "../../partitial/auth/auth.service";
import {userData} from "../../partitial/auth/user.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-private-messages',
  templateUrl: './private-messages.component.html',
  styleUrls: ['./private-messages.component.css']
})
export class PrivateMessagesComponent implements OnInit {
  inboxMessages = [];
  outboxMessages = [];
  isLoaded : boolean = false;

  constructor(public http: HttpClient) {
    this.http.get<{ profile: userData, error: boolean, inbox, outbox }>(environment.baseUrl + "api/user/profile")
        .subscribe(user => {
          if (!user.error) {
            this.inboxMessages = user.inbox;
            this.outboxMessages = user.outbox;
            this.isLoaded = true;
          }
        });
  }

  ngOnInit() {
  }

}
