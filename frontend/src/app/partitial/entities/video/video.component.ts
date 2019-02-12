import { Component, OnInit,OnDestroy } from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css' , './rating-template.css']
})
export class VideoComponent implements OnInit,OnDestroy {
  currentRate: Number = 6;

  onRatingClicked(value) {
    console.log("Rating is: " + (value+1));
  }

  constructor(public entitiesService : entitiesService,private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.entitiesService.videoEmitter.subscribe(video =>{


    });
    this.route.params.subscribe(params => {
      this.entitiesService.getVideo(params['_id']);
    });
  }

  ngOnDestroy(): void {
  }
}
