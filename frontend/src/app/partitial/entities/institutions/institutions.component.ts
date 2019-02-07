import { Component, OnInit, OnDestroy } from '@angular/core';
import {entitiesService} from "../entities.service";

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.css']
})
export class InstitutionsComponent implements OnInit{

  constructor(private entitiesService : entitiesService) { }

  ngOnInit() {
    this.entitiesService.getInstitutions();
  }
}
