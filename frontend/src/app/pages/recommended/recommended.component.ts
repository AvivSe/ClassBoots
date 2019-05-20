import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {
  itemlist: any[] = [];
  isLoaded: boolean = false;

  constructor(http: HttpClient, private router: Router) {
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
