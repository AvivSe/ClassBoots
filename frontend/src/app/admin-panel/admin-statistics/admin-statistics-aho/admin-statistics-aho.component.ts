import { Component, OnInit } from '@angular/core';
import {entitiesService} from "../../../partitial/entities/entities.service";

@Component({
  selector: 'app-admin-statistics-aho',
  templateUrl: './admin-statistics-aho.component.html',
  styleUrls: ['./admin-statistics-aho.component.css']
})
export class AdminStatisticsAhoComponent implements OnInit {
  words = [];
  result = [];
  constructor(private entitiesService : entitiesService) { }

  ngOnInit() {
  }

  onAdd(word){
    this.words.push(word.value.name);
    word.resetForm();
  }

  runAlgorithm(){
    this.entitiesService.ahoAlgorithm({words:this.words},(data)=>{
      this.result = data;
    })
  }

}
