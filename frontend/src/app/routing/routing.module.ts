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
import {LoginBoxComponent} from "../partitial/auth/login-box/login-box.component";
import {EmptyComponent} from "../empty/empty.component";
import {EmptyTwoComponent} from "../empty-two/empty-two.component";
import {ItemsListComponent} from "../partitial/entities/items-list/items-list.component";
import {SchoolsComponent} from "../partitial/entities/schools/schools.component";
import {SubjectsComponent} from "../partitial/entities/subjects/subjects.component";
import {LecturesComponent} from "../partitial/entities/lectures/lectures.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'schools/:_id', component: SchoolsComponent},
  { path: 'subjects/:_id', component: SubjectsComponent},
  { path: 'lectures/:_id', component: LecturesComponent},
  { path: 'Video/:_id', component: VideoComponent },
  {path: 'admin', component: AdminPanelComponent, children: [
            {path: '', redirectTo: 'statistics', pathMatch: 'full'},
            {path: 'statistics/:about', component: AdminStatisticsComponent, outlet: 'adminPanel'},
            {path: 'statistics', component: AdminStatisticsComponent, outlet: 'adminPanel'},
            {path: 'collections/:about', component: AdminCollectionsManagerComponent, outlet: 'adminPanel'},
            {path: 'collections/:about', component: EmptyTwoComponent, outlet: 'myOutlet'},
            {path: 'aviv', component: EmptyComponent, outlet: 'myOutlet'},
            {path: 'collections', component: AdminCollectionsManagerComponent, outlet: 'adminPanel'}
            ]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}
