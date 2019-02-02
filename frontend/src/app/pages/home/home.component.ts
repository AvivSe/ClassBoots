import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public institutions: any[];

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8080/api/institution').subscribe(data => {
      this.institutions = data as any[];
    });

  }

  ngOnInit() {
  }

}
