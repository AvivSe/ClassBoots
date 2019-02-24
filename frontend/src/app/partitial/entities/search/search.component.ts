import { Component, OnInit } from '@angular/core';
import {userData} from "../../auth/user.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  answerLoaded : boolean = false;
  data;
  constructor(private authService: AuthService ) { }

  ngOnInit() {
    this.authService.searchEmitter.subscribe(data=> {
      this.data=data;
      this.answerLoaded = true;
    });
  }

  onSearch(searchForm) {
    if(searchForm.invalid)
      return;
    const searchData ={
      institution: searchForm.value.searchInstitution,
      school: searchForm.value.searchSchool,
      subject: searchForm.value.searchSubject,
      lecture: searchForm.value.searchLecture,
    };
    this.authService.findLecture(searchData);
    searchForm.resetForm();
  }


}
