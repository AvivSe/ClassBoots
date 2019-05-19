import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.css']
})
export class WatchLaterComponent implements OnInit {

  itemlist: any[] = [];
  isLoaded: boolean = false;

  constructor(http: HttpClient) {
    http.get(environment.baseUrl + 'api/user/history/videos').subscribe(data=> {
      (data as any[]).forEach(video=> {
        this.itemlist.push({...video, youtubeImageNumber:0})
      });
      this.isLoaded = true;
    });
  }

  ngOnInit() {

  }
}
