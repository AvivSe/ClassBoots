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
import {PleaseLoginComponent} from "../pages/please-login/please-login.component";

const routes: Routes = [

    //Page routes
    {path: '', component: HomeComponent},
    {path: 'About', component: AboutComponent},
    {path: 'Contact', component: ContactComponent},
    {path: 'privacy', component: PrivacyComponent},
    {path: 'terms', component: TermsComponent},

    //Authentication routes
    {path: '', component: LoginBoxComponent, outlet: 'modal'},
    {path: 'Login', component: LoginBoxComponent, outlet: 'modal'},
    {path: 'Register', component: RegisterBoxComponent, outlet: 'modal'},
    {path: 'Profile', component: ProfileComponent},
    {path: 'PleaseLogin', component: PleaseLoginComponent},

    //Menu routes
    {path: 'schools/:_id', component: SchoolsComponent},
    {path: 'subjects/:_id', component: SubjectsComponent},
    {path: 'lectures/:_id', component: LecturesComponent},
    {path: 'Video/:_id', component: VideoComponent, canActivate:[AuthGuardService]},

    //Create routes
    {path: 'Institution/create/:currentId', component: InstitutionCreateComponent, canActivate:[AuthGuardService]},
    {path: 'School/create/:currentId', component: CreateSchoolComponent, canActivate:[AuthGuardService]},
    {path: 'Subject/create/:currentId', component: SubjectCreateComponent, canActivate:[AuthGuardService]},
    {path: 'Lecture/create/:currentId', component: LectureCreateComponent, canActivate:[AuthGuardService]},

    //Edit routes
    {path: 'Institution/edit/:_id', component: InstitutionEditComponent, canActivate:[AuthGuardService]},
    {path: 'School/edit/:_id', component: SchoolEditComponent, canActivate:[AuthGuardService]},
    {path: 'Subject/edit/:_id', component: SubjectEditComponent, canActivate:[AuthGuardService]},
    {path: 'Lecture/edit/:_id', component: LectureEditComponent, canActivate:[AuthGuardService]},

    //Admin panel routes
    {
        path: 'admin', component: AdminPanelComponent, canActivate:[AdminGuardService], children: [
            {path: '', redirectTo: 'statistics', pathMatch: 'full'},
            {path: 'statistics/:about', component: AdminStatisticsComponent, outlet: 'adminPanel'},
            {path: 'statistics', component: AdminStatisticsComponent, outlet: 'adminPanel'},
            {path: 'collections/:about', component: AdminCollectionsManagerComponent, outlet: 'adminPanel'},
            {path: 'collections', component: AdminCollectionsManagerComponent, outlet: 'adminPanel'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top'
    })],
    exports: [RouterModule]
})
export class RoutingModule {
}
