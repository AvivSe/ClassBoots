import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {
  data = {views:'',_id:''};
  currentLectureId;
  errorMessage: string;
  error: boolean = false;

  constructor(private route:ActivatedRoute,private entitiesService : entitiesService) { }

  ngOnInit() {
    this.entitiesService.videoEmitter.subscribe(data=>{
      if(data.error){
        this.error = true;
        this.errorMessage = data.description;
      }
      else {
        this.data = data;
      }
    });
    this.route.params.subscribe(params=>{
      console.log(params);
      this.entitiesService.getVideo(params['videoid']);
      this.currentLectureId = params['lectureid']
    })
  }
  onEdit(editForm){
    this.entitiesService.editVideo({id:this.data._id,views:editForm.value.views,lectureid:this.currentLectureId});
    editForm.resetForm()
  }
}
