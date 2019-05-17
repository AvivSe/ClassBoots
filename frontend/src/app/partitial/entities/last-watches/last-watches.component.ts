import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: 'app-last-watches',
  templateUrl: './last-watches.component.html',
  styleUrls: ['./last-watches.component.css']
})
export class LastWatchesComponent implements OnInit {
  itemlist: any[] = [];
  isLoaded: boolean = false;
  interval: any;

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

  startSwitchImages(itemId) {

    this.interval = setInterval(()=> {
      let myItem = this.itemlist.find(item => item._id === itemId);
      myItem.youtubeImageNumber = (++myItem.youtubeImageNumber%4)
    }, 500);
  }

  stopSwitchImages(itemId) {
    let myItem = this.itemlist.find(item => item._id === itemId);
    myItem.youtubeImageNumber = 0;
    clearInterval(this.interval);
  }

}
