import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {entitiesService} from "../entities.service";

@Component({
    selector: 'app-items-list',
    templateUrl: './items-list.component.html',
    styleUrls: ['./items-list.component.css']
})

export class ItemsListComponent implements OnInit {
    itemlist: any[];
    nextPath: string;
    title: string;
    currentId: string;

    constructor(private http: HttpClient, private entitiesService: entitiesService) {
    }

    ngOnInit() {
        this.entitiesService.itemListEmitter.subscribe(data => {
            this.nextPath = data._nextpath;
            this.itemlist = data._data;
            this.title = data.title;
            this.currentId = data.currentId;
        });
    }
}
