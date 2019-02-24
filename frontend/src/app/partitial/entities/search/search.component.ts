import { Component, OnInit } from '@angular/core';
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
  enableSearchBar : boolean = false;

  constructor(private entitiesService:entitiesService){}
  ngOnInit(){
    this.entitiesService.changeSideBarEmitter.subscribe(()=>{
      this.toggleShowDiv()
    })
  }

  toggleShowDiv() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }
}
