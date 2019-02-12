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

  public isLogged() {
    return this.authService.isLogged();
  }

  public isSidebarCollapsed() {
    return this.collapsed;
  }

  public toggle() {
    this.authService.toggleSidebar();
  }

  ngOnInit() {}

}
