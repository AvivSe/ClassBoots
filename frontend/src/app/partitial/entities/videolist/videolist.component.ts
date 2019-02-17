import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../entities.service";

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {
  data = [{position: '',_id:''}];
  currentLecture;
  constructor(private entitiesService :entitiesService) { }

  ngOnInit() {
    this.entitiesService.videoListEmitter.subscribe(data=>{
      this.data = data.data;
      this.currentLecture = data.lectureid;
    })
  }
  onClick(videoId){
    this.entitiesService.getVideo(videoId);
  }

}
