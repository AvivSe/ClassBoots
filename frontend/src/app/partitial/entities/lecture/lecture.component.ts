import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  currentLecture = {name: '',_id: '',description: '',lecturer: '',date: ''};
  init: boolean = false;

  constructor(public entitiesService : entitiesService,private route: ActivatedRoute, public http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.entitiesService.getLecture(params['_id']);
    });
    this.entitiesService.lectureEmitter.subscribe(lecture =>{
      this.currentLecture = lecture;
      this.init = true;
    });
  }

}
