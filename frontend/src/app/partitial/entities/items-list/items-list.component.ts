import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {entitiesService} from "../entities.service";
import {AuthService} from "../../auth/auth.service";

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
    enableAdd: boolean;
    isLoaded: boolean = false;

    constructor(private http: HttpClient, private entitiesService: entitiesService,private authService:AuthService) {
    }
    ngOnInit() {
        this.entitiesService.itemListEmitter.subscribe(data => {
            this.nextPath = data._nextpath;
            this.itemlist = data._data;
            this.title = data.title;
            this.currentId = data.currentId;
            this.enableAdd = data.enableAdd;
            this.isLoaded = true;
        });
    }
    getImage(image){
        if(image == null) {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlt7ypGCM9JZSCGfXXphw_WOvsys7fs4Oagpo8ZZfbZi8adCvQ'
        }
        return image;
    }
    deleteElement(_id){
        this.entitiesService.deleteElement({id:_id});
    }

}
