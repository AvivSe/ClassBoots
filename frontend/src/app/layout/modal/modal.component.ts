import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {AuthService} from "../../partitial/auth/auth.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalRef: BsModalRef;
  loginName = '';

  constructor(private modalService: BsModalService,private authService : AuthService) {
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
    if(this.loginName=='')
      return false;
    return true;
  }
}