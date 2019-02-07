import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-collections',
  templateUrl: './admin-collections.component.html',
  styleUrls: ['./admin-collections.component.css']
})
export class AdminCollectionsManagerComponent implements OnInit , OnDestroy{
  about: String;
  private sub: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.about = params['about'];
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
