import { Component, OnInit } from '@angular/core';
import {SlideInOutAnimation} from "../../../../animations";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material";
import {MessagesService} from "../messages.service";

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.css'],
  animations: [SlideInOutAnimation]
})
export class PostMessageComponent implements OnInit {
  newMessage = "out";
  toList = [];
  error : boolean = false;
  errorMessage = "";
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public messageService : MessagesService){}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.toList.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(item): void {
    const index = this.toList.indexOf(item);

    if (index >= 0) {
      this.toList.splice(index, 1);
    }
  }
  changeState(){
    this.newMessage = this.newMessage === "out" ? "in" : "out";
  }

  ngOnInit(): void {
    this.messageService.MessagesSendEmitter.subscribe(data => {
      if(data.error){
        this.error = true;
        this.errorMessage = data.description;
      }
      else{
        this.changeState();
      }
    })
  }

  setErrorMessage(errorMsg : string){
    if(errorMsg !== null){
      this.error = true;
      this.errorMessage = errorMsg;
    }
    else{
      this.error = false;
      this.errorMessage = "";
    }
  }
  sendMessage(msg){
    if(msg === "") this.setErrorMessage("Message is required");
    if(this.toList.length === 0) this.setErrorMessage("Minimum 1 email required.");
    this.messageService.sendMessage({to: this.toList,message: msg.value});
  }
}
