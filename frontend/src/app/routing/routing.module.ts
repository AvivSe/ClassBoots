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
import {EmptyComponent} from "../empty/empty.component";
import {EmptyTwoComponent} from "../empty-two/empty-two.component";
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

    //Menu routes
    {path: 'schools/:_id', component: SchoolsComponent},
    {path: 'subjects/:_id', component: SubjectsComponent},
    {path: 'lectures/:_id', component: LecturesComponent},
    {path: 'Video/:_id', component: VideoComponent},

    //Create routes
    {path: 'Institution/create/:currentId', component: InstitutionCreateComponent},
    {path: 'School/create/:currentId', component: CreateSchoolComponent},
    {path: 'Subject/create/:currentId', component: SubjectCreateComponent},
    {path: 'Lecture/create/:currentId', component: LectureCreateComponent},

    //Edit routes
    {path: 'Institution/edit/:_id', component: InstitutionEditComponent},
    {path: 'School/edit/:_id', component: SchoolEditComponent},
    {path: 'Subject/edit/:_id', component: SubjectEditComponent},
    {path: 'Lecture/edit/:_id', component: LectureEditComponent},

    //Admin panel routes
    {
        path: 'admin', component: AdminPanelComponent, children: [
            {path: '', redirectTo: 'statistics', pathMatch: 'full'},
            {path: 'statistics/:about', component: AdminStatisticsComponent, outlet: 'adminPanel'},
            {path: 'statistics', component: AdminStatisticsComponent, outlet: 'adminPanel'},
            {path: 'collections/:about', component: AdminCollectionsManagerComponent, outlet: 'adminPanel'},
            {path: 'collections/:about', component: EmptyTwoComponent, outlet: 'myOutlet'},
            {path: 'aviv', component: EmptyComponent, outlet: 'myOutlet'},
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
