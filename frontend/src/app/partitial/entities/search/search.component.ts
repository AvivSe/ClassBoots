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

  constructor(private entitiesService:entitiesService){
    this.entitiesService.SearchEmitter.subscribe(() =>{
      this.toggleShowDiv();
    })
  }
  ngOnInit(){}
  toggleShowDiv() {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }
}
