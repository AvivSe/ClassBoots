import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-video-listing',
  templateUrl: './video-listing.component.html',
  styleUrls: ['./video-listing.component.css']
})
export class VideoListingComponent implements OnInit {

  @Input() itemlist: any[] = [];
  @Input() isLoaded: boolean = false;
  interval: any;

  constructor(http: HttpClient, private router: Router) {

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
