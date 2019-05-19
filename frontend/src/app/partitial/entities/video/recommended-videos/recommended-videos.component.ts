import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import video from "../../../../admin-panel/admin-collections/definitions/video";

@Component({
  selector: 'app-recommended-videos',
  templateUrl: './recommended-videos.component.html',
  styleUrls: ['./recommended-videos.component.css']
})
export class RecommendedVideosComponent implements OnInit {

  @Input() videoId: string = null;
  itemlist: any[] = [];
  isLoaded: boolean = false;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get(environment.baseUrl + 'api/video/getRelatedVideos/' + this.videoId).subscribe(data=> {
      (data as any[]).forEach(video=> {
        this.itemlist.push({...video, youtubeImageNumber:0})
      });
      this.isLoaded = true;
    });
  }

}
