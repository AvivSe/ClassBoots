import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from "@angular/material";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-send-pm',
  templateUrl: './send-pm.component.html',
  styleUrls: ['./send-pm.component.css']
})
export class SendPmComponent implements OnInit {

  constructor(public http: HttpClient,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {

  }

  handleSubmit(commentForm: NgForm) {
    this.http.post(environment.baseUrl + 'api/user/sendpm', { to:this.data.to.toString(), message: commentForm.value.message }).subscribe(res=> {
      this.dialog.closeAll();
    });
  }
}
