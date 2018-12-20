import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Client';
  content: any;
  constructor(private http: HttpClient) {
    http.get('http://localhost:3000/getinstitutions').subscribe((data) => {
      console.log(data);
    });
  }
}
