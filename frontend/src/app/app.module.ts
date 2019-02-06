// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";
import { MatInputModule,MatCardModule,MatButtonModule,MatExpansionModule } from "@angular/material";
import {AgGridModule} from 'ag-grid-angular';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// local imports
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { UserBoxComponent } from './partitial/auth/user-box/user-box.component';
import { BodyComponent } from './layout/body/body.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import {RoutingModule} from "./routing/routing.module";
import { LoginComponent } from './partitial/auth/login/login.component';
import { WriteCommentComponent } from './partitial/comments/write-comment/write-comment.component';
import { AppComponent } from './app.component';
import { ListCommentsComponent } from './partitial/comments/list-comments/list-comments.component';
import { VideoComponent } from './pages/video/video.component';
import { RecommendedVideosComponent } from './partitial/recommended-videos/recommended-videos.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginBoxComponent } from './partitial/auth/login-box/login-box.component';
import { RegisterBoxComponent } from './partitial/auth/register-box/register-box.component';
import {AuthService} from "./partitial/auth/auth.service";
import {AuthInterceptor} from "./partitial/auth/auth.interceptor";
import { UsersManagerComponent } from './administrator/users-manager/users-manager.component';
import { VideosManagerComponent } from './administrator/videos-manager/videos-manager.component';
import { MangerMenuComponent } from './administrator/manger-menu/manger-menu.component';
import { StatisticsComponent } from './administrator/statistics/statistics.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ModalComponent } from './layout/modal/modal.component';
import { InstitutionsManagerComponent } from './administrator/institutions-manager/institutions-manager.component';
import { SchoolsManagerComponent } from './administrator/schools-manager/schools-manager.component';
import { SubjectsManagerComponent } from './administrator/subjects-manager/subjects-manager.component';
import { LecturesManagerComponent } from './administrator/lectures-manager/lectures-manager.component';
import { ItemsListComponent } from './partitial/items-list/items-list.component';
import { ProfileComponent } from './partitial/auth/profile/profile.component';

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
    LoginBoxComponent,
    RegisterBoxComponent,
    UsersManagerComponent,
    VideosManagerComponent,
    MangerMenuComponent,
    StatisticsComponent,
    PrivacyComponent,
    TermsComponent,
    ItemsListComponent,
    ProfileComponent,
    TermsComponent,
    ModalComponent,
    InstitutionsManagerComponent,
    SchoolsManagerComponent,
    SubjectsManagerComponent,
    LecturesManagerComponent,

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
    MatExpansionModule,
    Ng2GoogleChartsModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot()
  ],
  entryComponents: [
      ModalComponent
    AgGridModule.withComponents([]),
    MatGridListModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi:true}],
  bootstrap: [AppComponent],

})
export class AppModule { }
