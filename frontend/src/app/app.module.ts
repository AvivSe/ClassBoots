import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AboutComponent } from './partitial/about/about.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginBoxComponent } from './partitial/login-box/login-box.component';
import { BodyComponent } from './layout/body/body.component';
import { SomepageComponent } from './pages/somepage/somepage.component';
import { HomeComponent } from './pages/home/home.component';
import {RoutingModule} from "./routing/routing.module";
import { ShirComponent } from './pages/shir/shir.component';
import { RegisterComponent } from './pages/user/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    SidebarComponent,
    LoginBoxComponent,
    BodyComponent,
    SomepageComponent,
    HomeComponent,
    ShirComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
