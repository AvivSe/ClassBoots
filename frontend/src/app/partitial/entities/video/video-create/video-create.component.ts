import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.component.html',
  styleUrls: ['./video-create.component.css']
})
export class VideoCreateComponent implements OnInit {
  currentLecture;
  errorMessage: string;
  error: boolean = false;

  constructor(private route:ActivatedRoute,private entitiesService:entitiesService) { }
  ngOnInit() {
    this.entitiesService.videoEmitter.subscribe(data=>{
      if(data.error){
        this.error = true;
        this.errorMessage = data.description;
      }
    });
    this.route.params.subscribe(params =>{
      this.currentLecture = params['currentId'];
    })
  }
  onCreate(createForm){
    const video = {
      lectureid: this.currentLecture,
      name: createForm.value.name,
      reference: createForm.value.reference,
      position: createForm.value.position
    };
    this.entitiesService.addVideo(video);
    createForm.resetForm();
  }

}
