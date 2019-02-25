import {Component, Input, OnInit} from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {
  @Input() lectureId;
  data = [{position: '',_id:''}];

  constructor(private entitiesService :entitiesService, route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.entitiesService.getPlaylistByLectureId(this.lectureId,(data)=> {
      this.data = data;
    });
  }
  onClick(videoId){
    this.router.navigateByUrl('/lecture/'+this.lectureId, {skipLocationChange: true}).then(()=>
        this.router.navigate(['/lecture/'+this.lectureId, { outlets: { videoOutlet: [videoId] } }]));
  }

}