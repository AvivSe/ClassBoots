import {Component, OnInit} from '@angular/core';
import {AuthService} from "./partitial/auth/auth.service";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService : AuthService,public socket: Socket) {
    this.socket.emit('connection', { name:"aviv" });
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    document.getElementById("loading").style.display = 'none';
  }
}
