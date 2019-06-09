import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {SlideInOutAnimation} from "../../../animations";
import {AuthService} from "../auth/auth.service";
import {entitiesService} from "../entities/entities.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [SlideInOutAnimation]
})
export class SearchComponent implements OnInit {
  animationState = 'out';
  enableSearchBar: boolean = false;
  data: any[] = [];
  isDisabled: any;
  constructor(private authService: AuthService,private entitiesService: entitiesService, private router:Router, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.entitiesService.SearchEmitter.subscribe(data=> {
      if(data != null) {
        this.data = data;
      }
    })
  }
  onSearch(searchForm) {
    if (searchForm.invalid)
      return;
    this.entitiesService.find({generalSearch: searchForm.value.generalSearch});
  }

  navigate(item){

    let url = null;

    switch (item.type) {
      case "Lecture":
        url = '/lecture/' + item.object._id;
      break;

      case "Video":
        url = '/lecture/'+ item.object.lectureid +'/(videoOutlet:' + item.object._id + ')';

        break;
      case "Institution":
        url = '/institution/' + item.object._id;

        break;

      case "School":
        url = '/school/' + item.object._id;

        break;

      case "Subject":
        url = '/subject/' + item.object._id;

        break;

      default:
        break;

    }
    this.dialog.closeAll();

    if(url) {
      this.router.navigateByUrl('', {skipLocationChange: true}).then(() =>
          this.router.navigateByUrl(url));
    }

  }
}
