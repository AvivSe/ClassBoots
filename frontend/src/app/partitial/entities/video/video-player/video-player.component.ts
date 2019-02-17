import {Component, Input, OnInit} from '@angular/core';
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  _id = 'VDrzAWlWykM';
  constructor(private entitiesService : entitiesService) {
  }
  ngOnInit() {}
}
