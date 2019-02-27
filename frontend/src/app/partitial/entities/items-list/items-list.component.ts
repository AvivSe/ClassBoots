import {Component, Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {entitiesService} from "../entities.service";
import {AuthService} from "../../auth/auth.service";
import {Router, RouterStateSnapshot} from "@angular/router";

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

    constructor(private http: HttpClient, private entitiesService: entitiesService, public authService: AuthService,private router : Router) {
    }

    ngOnInit() {
        this.entitiesService.itemListEmitter.subscribe(data => {
            this.nextPath = data._nextpath;
            this.itemlist = data._data as any[];
            this.title = data.title;
            this.currentId = data.currentId;
            this.enableAdd = data.enableAdd;
            this.isLoaded = true;
        });
    }

    getImage(image) {
        if (image == null) {
            return 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/Fotolia_117855281_Subscription_Monthly_M.jpg';
        }
        return image;
    }

    setRedirect() {
        this.entitiesService.setRedirectUrl(this.router.routerState.snapshot);
    }
}
