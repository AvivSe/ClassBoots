import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "../pages/home/home.component";
import {VideoComponent} from "../partitial/entities/video/video.component"
import {AboutComponent} from "../pages/about/about.component";
import {ContactComponent} from "../pages/contact/contact.component";
import {PrivacyComponent} from "../pages/privacy/privacy.component";
import {TermsComponent} from "../pages/terms/terms.component";
import {ProfileComponent} from "../partitial/auth/profile/profile.component";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import {AdminStatisticsComponent} from "../admin-panel/admin-statistics/admin-statistics.component";
import {AdminCollectionsManagerComponent} from "../admin-panel/admin-collections/admin-collections.component";
import {SchoolsComponent} from "../partitial/entities/schools/schools.component";
import {SubjectsComponent} from "../partitial/entities/subjects/subjects.component";
import {LecturesComponent} from "../partitial/entities/lectures/lectures.component";
import {RegisterBoxComponent} from "../partitial/auth/register-box/register-box.component";
import {InstitutionCreateComponent} from "../partitial/entities/institutions/institution-create/institution-create.component";
import {CreateSchoolComponent} from "../partitial/entities/schools/scholl-create/create-school.component";
import {SubjectCreateComponent} from "../partitial/entities/subjects/subject-create/subject-create.component";
import {LectureCreateComponent} from "../partitial/entities/lectures/lecture-create/lecture-create.component";
import {InstitutionEditComponent} from "../partitial/entities/institutions/institution-edit/institution-edit.component";
import {SubjectEditComponent} from "../partitial/entities/subjects/subject-edit/subject-edit.component";
import {SchoolEditComponent} from "../partitial/entities/schools/school-edit/school-edit.component";
import {LectureEditComponent} from "../partitial/entities/lectures/lecture-edit/lecture-edit.component";
import {LoginBoxComponent} from "../partitial/auth/login-box/login-box.component";
import {AuthGuardService} from "../partitial/auth/auth-guard.service";
import {AdminGuardService} from "../partitial/auth/admin-guard.service";
import {PleaseLoginComponent} from "../pages/errors/please-login/please-login.component";
import {VideoCreateComponent} from "../partitial/entities/video/video-create/video-create.component";
import {VideoEditComponent} from "../partitial/entities/video/video-edit/video-edit.component";
import {LectureComponent} from "../partitial/entities/lecture/lecture.component";
import {LastWatchesComponent } from "../partitial/entities/last-watches/last-watches.component";
import {PageNotFoundComponent} from "../pages/errors/page-not-found/page-not-found.component";
import {PermissionDeniedComponent} from "../pages/errors/permission-denied/permission-denied.component";
import {CanNotHandleComponent} from "../pages/errors/can-not-handle/can-not-handle.component";
import {BadRequestComponent} from "../pages/errors/bad-request/bad-request.component";
import {NotAllowedComponent} from "../pages/errors/not-allowed/not-allowed.component";

const routes: Routes = [

    //Page routes
    {path: '', component: HomeComponent},
    {path: 'About', component: AboutComponent},
    {path: 'Contact', component: ContactComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'terms', component: TermsComponent},
    {path: 'last-watches', component: LastWatchesComponent},

    //Authentication routes
    {path: '', component: LoginBoxComponent, outlet: 'modal'},
    {path: 'Login', component: LoginBoxComponent, outlet: 'modal'},
    {path: 'Register', component: RegisterBoxComponent, outlet: 'modal'},
    {path: 'Profile', component: ProfileComponent},
    {path: 'PleaseLogin', component: PleaseLoginComponent},
    {path: 'PermissionDenied', component: PermissionDeniedComponent},
    {path: '404', component: PageNotFoundComponent},
    {path: '503', component: CanNotHandleComponent},
    {path: '400', component: BadRequestComponent},
    {path: '405', component: NotAllowedComponent},


    //Menu routes
    {path: 'institution/:_id', component: SchoolsComponent},
    {path: 'school/:_id', component: SubjectsComponent},
    {path: 'subject/:_id', component: LecturesComponent},
    {path: 'lecture/:_id', component: LectureComponent, canActivate:[AuthGuardService], children: [
        {path: ':videoId', component: VideoComponent, outlet: 'videoOutlet'}
        ]
    },
    {path: 'video/:_id', component: VideoComponent, canActivate:[AuthGuardService]},

    //Create routes
    {path: 'Institution/create/:currentId', component: InstitutionCreateComponent,canActivate:[AdminGuardService]},
    {path: 'School/create/:currentId', component: CreateSchoolComponent,canActivate:[AdminGuardService]},
    {path: 'Subject/create/:currentId', component: SubjectCreateComponent,canActivate:[AdminGuardService]},
    {path: 'Lecture/create/:currentId', component: LectureCreateComponent,canActivate:[AdminGuardService]},
    {path: 'Video/create/:currentId', component: VideoCreateComponent, canActivate:[AdminGuardService]},

    //Edit routes
    {path: 'Institution/edit/:_id', component: InstitutionEditComponent, canActivate:[AdminGuardService]},
    {path: 'School/edit/:_id', component: SchoolEditComponent, canActivate:[AdminGuardService]},
    {path: 'Subject/edit/:_id', component: SubjectEditComponent, canActivate:[AdminGuardService]},
    {path: 'Lecture/edit/:_id', component: LectureEditComponent, canActivate:[AdminGuardService]},
    {path: 'Video/edit/:videoid', component: VideoEditComponent, canActivate:[AdminGuardService]},

    //Admin panel routes
    {
        path: 'admin', component: AdminPanelComponent, canActivate:[AdminGuardService], children: [
            {path: '', redirectTo: 'statistics', pathMatch: 'full'},
            {path: 'statistics/:about', component: AdminStatisticsComponent, outlet: 'adminPanel'},
            {path: 'statistics', component: AdminStatisticsComponent, outlet: 'adminPanel'},
            {path: 'collections/:about', component: AdminCollectionsManagerComponent, outlet: 'adminPanel'},
            {path: 'collections', component: AdminCollectionsManagerComponent, outlet: 'adminPanel'}
        ]
    },
    {path: '**', redirectTo: '/404'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class RoutingModule {
}
