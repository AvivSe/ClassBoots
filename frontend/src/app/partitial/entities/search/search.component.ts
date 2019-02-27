import { Component, OnInit } from '@angular/core';
import {userData} from "../../auth/user.model";
import {AuthService} from "../../auth/auth.service";
import {entitiesService} from "../entities.service";
import {SlideInOutAnimation} from "../../../../animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [SlideInOutAnimation]
})
export class SearchComponent implements OnInit {
  animationState = 'out';
  enableSearchBar: boolean = false;
  answerLoaded: boolean = false;
  data;
    isDisabled: any;
  constructor(private authService: AuthService,private entitiesService: entitiesService, private router:Router) {
  }
  ngOnInit() {
      this.entitiesService.SearchEmitter.subscribe(data=>{
          if(data == null) {
              this.toggleShowDiv();
          }
          else{
              this.data = data;
              this.answerLoaded = true;
          }
      })
  }
  toggleShowDiv() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
    setTimeout(() => {
      this.answerLoaded = false;
    }, 1000);
  }
  onSearch(searchForm) {
    if (searchForm.invalid)
      return;
    const searchData = {
      generalSearch: searchForm.value.generalSearch,
      date: searchForm.value.date,
      lecturer: searchForm.value.lecturer,
      school: searchForm.value.school,
    };
    this.entitiesService.findLecture(searchData);
    searchForm.resetForm();
  }
  navToLecture(lectureId){
      this.router.navigateByUrl('', {skipLocationChange: true}).then(()=>
          this.router.navigateByUrl('/lecture/'+lectureId));
  }
}
