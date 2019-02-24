import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../partitial/entities/entities.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private entitiesService:entitiesService) { }

  ngOnInit() {
  }

}
