import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../entities.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: 'app-last-watches',
  templateUrl: './last-watches.component.html',
  styleUrls: ['./last-watches.component.css']
})
export class LastWatchesComponent implements OnInit {
  videos: any[];

  constructor(http: HttpClient, private router: Router) {
    http.get(environment.baseUrl + 'api/user/history/videos').subscribe(data=> {
      this.videos = data as any[];
    });
  }
  ngOnInit() {
  }

}
