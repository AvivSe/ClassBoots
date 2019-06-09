import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from "../../partitial/auth/auth.service";
import {Router} from "@angular/router";
import {entitiesService} from "../../partitial/entities/entities.service";
import {ProfileComponent} from "../../partitial/auth/profile/profile.component";
import {MatDialog} from "@angular/material";
import {SearchComponent} from "../../partitial/search/search.component";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalRef: BsModalRef;
  loginName = '';

  constructor(private modalService: BsModalService,public authService : AuthService, private router: Router,public entitiesService:entitiesService,public dialog: MatDialog) {
    authService.getUser.subscribe(user =>{
      this.loginName = user.email;
    });
    authService.commandSuccess.subscribe(nothing => {
      this.modalRef.hide();
    })

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
  }

  isLogged(){
    return this.authService.isLogged()
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  changeSearchComponent(){
    this.entitiesService.SearchEmitter.emit();
  }

  openSearchDialog() {
    this.dialog.open(SearchComponent, {width: '60vw',height: '40vh'});

  }

  openProfileDialog() {
    this.dialog.open(ProfileComponent, {width: '60vw'});
  }
}