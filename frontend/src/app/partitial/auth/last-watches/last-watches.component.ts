import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../entities/entities.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-last-watches',
  templateUrl: './last-watches.component.html',
  styleUrls: ['./last-watches.component.css']
})
export class LastWatchesComponent implements OnInit {
  videos: any[];

  constructor(http: HttpClient) {
    http.get(environment.baseUrl + 'api/user/history/videos').subscribe(data=> {
      this.videos = data as any[];
    });
  }
  ngOnInit() {
  }

}
