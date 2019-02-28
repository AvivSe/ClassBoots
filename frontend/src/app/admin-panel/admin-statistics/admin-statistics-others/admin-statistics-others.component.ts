import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-admin-statistics-others',
  templateUrl: './admin-statistics-others.component.html',
  styleUrls: ['./admin-statistics-others.component.css']
})
export class AdminStatisticsOthersComponent implements OnInit {
  mapReduceValue : string = '';
  cmsValue : string = '';
  twoWayBinding : string = '';
  twoWayBindingCounter = 0;
  usersResult = [];

  constructor(public socket: Socket,private http : HttpClient) {
    socket.on('someEvent', (x)=>{
      this.twoWayBinding = "Event" + JSON.stringify(x);
      this.twoWayBindingCounter++;
    });
  }
  ngOnInit() {
  }

  onMyClick() {
    this.socket.emit('someEvent', {myData:'Samba'});
  }

  CalculateMapReduce(){
    this.http.get<{totalVideos:string}>(environment.baseUrl+'api/lecture/stats/').subscribe(data=>{
      this.mapReduceValue = data.totalVideos;
    });
  }

  CalculateCMS(Entity,EntityID){
    if(Entity.value != '') {
      this.http.get<{ total: string }>(environment.baseUrl + 'api/' + Entity.value + '/' + EntityID.value + '/cms').subscribe(data => {
        this.cmsValue = data.total;
      });
    }
    else {
      this.http.get<{ totalViews: string }>(environment.baseUrl + 'api/cms').subscribe(data => {
        this.cmsValue = data.totalViews;
      });
    }
  }
  onSearchUser(User){
    this.http.post(environment.baseUrl+'api/search/users',User.value).subscribe((data:[])=>{
      this.usersResult = data;
    });

  }
}
