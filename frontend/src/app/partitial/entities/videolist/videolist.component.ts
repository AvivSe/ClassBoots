import {Component, Input, OnInit} from '@angular/core';
import {entitiesService} from "../entities.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {
  loaded: boolean = false;
  @Input() lectureId;
  data = [{name:'',position: '',_id:''}];

  constructor(private entitiesService :entitiesService, route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.entitiesService.getPlaylistByLectureId(this.lectureId,(data)=> {
      this.data = data;
      if(data.length > 0) {
        this.router.navigate(['/lecture/' + this.lectureId, {outlets: {videoOutlet: [data[0]._id]}}]);
        this.loaded = true;
      }
    });
  }
  onClick(videoId){
    this.router.navigateByUrl('/lecture/'+this.lectureId, {skipLocationChange: true}).then(()=>
        this.router.navigate(['/lecture/'+this.lectureId, { outlets: { videoOutlet: [videoId] } }]));
  }

  setRedirect(){
    this.router.navigateByUrl('/Video/create/'+this.lectureId);
    this.entitiesService.setRedirectUrl(this.router.routerState.snapshot);
  }
}
