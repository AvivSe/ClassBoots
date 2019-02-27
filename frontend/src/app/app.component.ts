import {Component, OnInit} from '@angular/core';
import {AuthService} from "./partitial/auth/auth.service";
import {Socket} from "ngx-socket-io";
import {Router} from "@angular/router";
import {detectChanges} from "@angular/core/src/render3";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService : AuthService,public socket: Socket, private router: Router) {
    this.router.events.subscribe((evt) => {
        window.scrollTo(0, 0);
    });

    this.socket.emit('connection', { name:"aviv" });
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    document.getElementById("loading").style.display = 'none';
  }
}
