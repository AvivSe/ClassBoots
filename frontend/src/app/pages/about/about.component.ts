import { Component, OnInit } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', '../style.css']
})
export class AboutComponent implements OnInit {

  constructor(public socket: Socket) {
    socket.on('someEvent', (x)=>{
      console.log("Some Event" + JSON.stringify(x));
    });
  }

  ngOnInit() {
  }
  onMyClick() {
    this.socket.emit('someEvent', {myData:'Samba'});
  }

}
