import {environment} from "../environments/environment";

// socket.io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const socketIoConfig: SocketIoConfig = { url: environment.baseUrl , options: {} };

// angular imports
import {BrowserModule} from '@angular/platform-browser';
import {Directive, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatPaginator,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatListModule,
    MatCheckboxModule
} from "@angular/material";
import {AgGridModule} from 'ag-grid-angular';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {ModalModule} from 'ngx-bootstrap/modal';
import { YoutubePlayerModule } from 'ngx-youtube-player';


// local imports
import {NavbarComponent} from './layout/navbar/navbar.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {BodyComponent} from './layout/body/body.component';
import {FooterComponent} from './layout/footer/footer.component';
import {HomeComponent} from './pages/home/home.component';
import {RoutingModule} from "./routing/routing.module";
import {WriteCommentComponent} from './partitial/comments/write-comment/write-comment.component';
import {AppComponent} from './app.component';
import {ListCommentsComponent} from './partitial/comments/list-comments/list-comments.component';
import {VideoComponent} from './partitial/entities/video/video.component';
import {RecommendedVideosComponent} from './partitial/entities/video/recommended-videos/recommended-videos.component';
import {AboutComponent} from './pages/about/about.component';
import {ContactComponent} from './pages/contact/contact.component';
import {LoginBoxComponent} from './partitial/auth/login-box/login-box.component';
import {RegisterBoxComponent} from './partitial/auth/register-box/register-box.component';
import {AuthInterceptor} from "./partitial/auth/auth.interceptor";
import {PrivacyComponent} from './pages/privacy/privacy.component';
import {TermsComponent} from './pages/terms/terms.component';
import {ModalComponent} from './layout/modal/modal.component';
import {ItemsListComponent} from './partitial/entities/items-list/items-list.component';
import {ProfileComponent} from './partitial/auth/profile/profile.component';
import {InstitutionsComponent} from './partitial/entities/institutions/institutions.component';
import {SchoolsComponent} from './partitial/entities/schools/schools.component';
import {SubjectsComponent} from './partitial/entities/subjects/subjects.component';
import {LecturesComponent} from './partitial/entities/lectures/lectures.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AdminMenuComponent} from './admin-panel/admin-menu/admin-menu.component';
import {AdminStatisticsComponent} from './admin-panel/admin-statistics/admin-statistics.component';
import {AdminCollectionsManagerComponent} from './admin-panel/admin-collections/admin-collections.component';
import {AgGridComponent} from './admin-panel/admin-collections/ag-grid/ag-grid.component';
import {AdminStatisticsPieChartComponent} from './admin-panel/admin-statistics/admin-statistics-pie-chart/admin-statistics-pie-chart.component';
import {AdminStatisticsMapChartComponent} from './admin-panel/admin-statistics/admin-statistics-map-chart/admin-statistics-map-chart.component';
import {AdminCollectionsUserComponent} from './admin-panel/admin-collections/admin-collections-user/admin-collections-user.component';
import {AdminCollectionsVideoComponent} from './admin-panel/admin-collections/admin-collections-video/admin-collections-video.component';
import {AdminCollectionsInstitutionComponent} from './admin-panel/admin-collections/admin-collections-institution/admin-collections-institution.component';
import {AdminCollectionsSchoolComponent} from './admin-panel/admin-collections/admin-collections-school/admin-collections-school.component';
import {AdminCollectionsSubjectComponent} from './admin-panel/admin-collections/admin-collections-subject/admin-collections-subject.component';
import {AdminCollectionsLectureComponent} from './admin-panel/admin-collections/admin-collections-lecture/admin-collections-lecture.component';
import { InstitutionCreateComponent } from './partitial/entities/institutions/institution-create/institution-create.component';
import { CreateSchoolComponent } from './partitial/entities/schools/scholl-create/create-school.component';
import { SubjectCreateComponent } from './partitial/entities/subjects/subject-create/subject-create.component';
import { LectureCreateComponent } from './partitial/entities/lectures/lecture-create/lecture-create.component';
import { InstitutionEditComponent } from './partitial/entities/institutions/institution-edit/institution-edit.component';
import { SubjectEditComponent } from './partitial/entities/subjects/subject-edit/subject-edit.component';
import { SchoolEditComponent } from './partitial/entities/schools/school-edit/school-edit.component';
import { LectureEditComponent } from './partitial/entities/lectures/lecture-edit/lecture-edit.component';
import { UserItemsComponent } from './layout/sidebar/user-items/user-items.component';
import { AuthGuardService } from "./partitial/auth/auth-guard.service";
import {AdminGuardService} from "./partitial/auth/admin-guard.service";
import { PleaseLoginComponent } from './pages/errors/please-login/please-login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LazyLoadingComponent } from './partitial/lazy-loading/lazy-loading.component';
import { VideoCreateComponent } from './partitial/entities/video/video-create/video-create.component';
import { VideoPlayerComponent } from './partitial/entities/video/video-player/video-player.component';
import { VideolistComponent } from './partitial/entities/videolist/videolist.component';
import { VideoEditComponent } from './partitial/entities/video/video-edit/video-edit.component';
import { SearchComponent } from './partitial/entities/search/search.component';
import { LectureComponent } from './partitial/entities/lecture/lecture.component';
import { YoutubeCommentsComponent } from './partitial/comments/youtube-comments/youtube-comments.component';
import {LastWatchesComponent} from "./partitial/entities/last-watches/last-watches.component";
import { PieDirectiveDirective } from './admin-panel/admin-statistics/admin-statistics-pie-chart/pie-directive.directive';

import { AdminStatisticsAhoComponent } from './admin-panel/admin-statistics/admin-statistics-aho/admin-statistics-aho.component';
import { AdminStatisticsGroupbyComponent } from './admin-panel/admin-statistics/admin-statistics-groupby/admin-statistics-groupby.component';
import { PageNotFoundComponent } from './pages/errors/page-not-found/page-not-found.component';
import { AdminStatisticsOthersComponent } from './admin-panel/admin-statistics/admin-statistics-others/admin-statistics-others.component';
import { PermissionDeniedComponent } from './pages/errors/permission-denied/permission-denied.component';
import { CanNotHandleComponent } from './pages/errors/can-not-handle/can-not-handle.component';
import { BadRequestComponent } from './pages/errors/bad-request/bad-request.component';
import { NotAllowedComponent } from './pages/errors/not-allowed/not-allowed.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        BodyComponent,
        HomeComponent,
        FooterComponent,
        WriteCommentComponent,
        ListCommentsComponent,
        VideoComponent,
        RecommendedVideosComponent,
        AboutComponent,
        ContactComponent,
        LoginBoxComponent,
        RegisterBoxComponent,
        PrivacyComponent,
        TermsComponent,
        ItemsListComponent,
        ProfileComponent,
        TermsComponent,
        ModalComponent,
        InstitutionsComponent,
        SchoolsComponent,
        SubjectsComponent,
        LecturesComponent,
        AdminPanelComponent,
        AdminMenuComponent,
        AdminStatisticsComponent,
        AdminCollectionsManagerComponent,
        AgGridComponent,
        AdminStatisticsPieChartComponent,
        AdminStatisticsMapChartComponent,
        AdminCollectionsUserComponent,
        AdminCollectionsVideoComponent,
        AdminCollectionsInstitutionComponent,
        AdminCollectionsSchoolComponent,
        AdminCollectionsSubjectComponent,
        AdminCollectionsLectureComponent,
        InstitutionCreateComponent,
        CreateSchoolComponent,
        SubjectCreateComponent,
        LectureCreateComponent,
        InstitutionEditComponent,
        SubjectEditComponent,
        SchoolEditComponent,
        LectureEditComponent,
        UserItemsComponent,
        PleaseLoginComponent,
        LazyLoadingComponent,
        VideoCreateComponent,
        VideoPlayerComponent,
        VideolistComponent,
        VideoEditComponent,
        SearchComponent,
        LastWatchesComponent,
        LectureComponent,
        YoutubeCommentsComponent,
        PieDirectiveDirective,
        AdminStatisticsAhoComponent,
        AdminStatisticsGroupbyComponent,
        PageNotFoundComponent,
        AdminStatisticsOthersComponent,
        PermissionDeniedComponent,
        CanNotHandleComponent,
        BadRequestComponent,
        NotAllowedComponent,
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
        MatGridListModule,
        MatExpansionModule,
        MatSlideToggleModule,
        Ng2GoogleChartsModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatPaginatorModule,
        MatListModule,
        AgGridModule.withComponents([]),
        ModalModule.forRoot(),
        NgbModule,
        SocketIoModule.forRoot(socketIoConfig),
        MatSnackBarModule,
        YoutubePlayerModule
    ],
    entryComponents: [
        ModalComponent
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},AuthGuardService,AdminGuardService],
    bootstrap: [AppComponent],

})
export class AppModule {
}
