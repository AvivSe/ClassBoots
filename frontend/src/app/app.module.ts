// angular imports
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatButtonToggleModule
} from "@angular/material";
import {AgGridModule} from 'ag-grid-angular';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {ModalModule} from 'ngx-bootstrap/modal';

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
import {RecommendedVideosComponent} from './partitial/recommended-videos/recommended-videos.component';
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
import {EmptyComponent} from './empty/empty.component';
import {EmptyTwoComponent} from './empty-two/empty-two.component';
import { InstitutionCreateComponent } from './partitial/entities/institutions/institution-create/institution-create.component';

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
        EmptyComponent,
        EmptyTwoComponent,
        InstitutionCreateComponent,
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
        Ng2GoogleChartsModule,
        MatButtonToggleModule,
        AgGridModule.withComponents([]),
        ModalModule.forRoot()
    ],
    entryComponents: [
        ModalComponent
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
    bootstrap: [AppComponent],

})
export class AppModule {
}
