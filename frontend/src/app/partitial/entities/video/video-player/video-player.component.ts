import {Component, Input, OnInit} from '@angular/core';
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @Input() _id = '';
  constructor() {
  }
  ngOnInit() {}
}
