import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  public itemlist: any[];
  currentRequest : string;

  constructor(private http: HttpClient) {
    this.onClick("institution");
  }
  ngOnInit(){
  }
  onClick(request){
    this.currentRequest = request;
    this.http.get(environment.baseUrl + 'api/' + request).subscribe(data => {
      this.itemlist = data as any[];
    })
  }
}
