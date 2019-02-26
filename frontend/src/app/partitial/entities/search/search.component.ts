import { Component, OnInit } from '@angular/core';
import {userData} from "../../auth/user.model";
import {AuthService} from "../../auth/auth.service";
import {entitiesService} from "../entities.service";
import {SlideInOutAnimation} from "../../../../animations";

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
  constructor(private authService: AuthService,private entitiesService: entitiesService) {
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
      generalSearch: searchForm.value.searchGeneral,
      date: searchForm.value.searchDate,
      lecturer: searchForm.value.searchLecturer,
      school: searchForm.value.searchSchool,
    };
    this.entitiesService.findLecture(searchData);
    searchForm.resetForm();
  }
}
