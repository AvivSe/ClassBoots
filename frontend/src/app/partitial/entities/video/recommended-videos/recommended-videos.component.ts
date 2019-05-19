import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-recommended-videos',
  templateUrl: './recommended-videos.component.html',
  styleUrls: ['./recommended-videos.component.css']
})
export class RecommendedVideosComponent implements OnInit {

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
