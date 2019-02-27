import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {entitiesService} from "../../entities.service";

@Component({
  selector: 'app-video-edit',
  templateUrl: './video-edit.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {
  data = {reference:'',name:'',position:''};
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
      this.entitiesService.getVideo(params['videoid']);
      this.currentLectureId = params['lectureid']
    })
  }
  onEdit(editForm){
    if (editForm.value.name != '')
      this.data.name = editForm.value.name;
    if (editForm.value.reference != '')
      this.data.reference = editForm.value.reference;
    if (editForm.value.position != '')
      this.data.position = editForm.value.position;
    this.entitiesService.editVideo(this.data);
  }
}
