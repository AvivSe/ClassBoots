import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../partitial/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private collapsed: boolean;
  constructor(public authService : AuthService) {
    this.collapsed = authService.getIsSidebarCollapsed();
  }

  private isLogged() {
    return this.authService.isLogged();
  }

  private isSidebarCollapsed() {
    return this.collapsed;
  }

  private toggle() {
    this.authService.toggleSidebar();
  }

  ngOnInit() {}

}
