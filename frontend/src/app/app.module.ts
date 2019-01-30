// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { MatInputModule,MatCardModule,MatButtonModule,MatExpansionModule } from "@angular/material";

// local imports
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserBoxComponent } from './partitial/user-box/user-box.component';
import { BodyComponent } from './layout/body/body.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import {RoutingModule} from "./routing/routing.module";
import { LoginComponent } from './partitial/login/login.component';
import { WriteCommentComponent } from './partitial/comments/write-comment/write-comment.component';
import { AppComponent } from './app.component';
import { ListCommentsComponent } from './partitial/comments/list-comments/list-comments.component';
import { VideoComponent } from './pages/video/video.component';
import { RecommendedVideosComponent } from './partitial/recommended-videos/recommended-videos.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    UserBoxComponent,
    BodyComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    WriteCommentComponent,
    ListCommentsComponent,
    VideoComponent,
    RecommendedVideosComponent,
    AboutComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
