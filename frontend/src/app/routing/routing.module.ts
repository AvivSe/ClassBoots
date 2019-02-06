import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import {VideoComponent} from "../pages/video/video.component";
import {AboutComponent} from "../pages/about/about.component";
import {ContactComponent} from "../pages/contact/contact.component";
import {UsersManagerComponent} from "../administrator/users-manager/users-manager.component";
import {InstitutionsManagerComponent} from "../administrator/institutions-manager/institutions-manager.component";
import {VideosManagerComponent} from "../administrator/videos-manager/videos-manager.component";
import {SchoolsManagerComponent} from "../administrator/schools-manager/schools-manager.component";
import {LecturesManagerComponent} from "../administrator/lectures-manager/lectures-manager.component";
import {SubjectsManagerComponent} from "../administrator/subjects-manager/subjects-manager.component";
import {StatisticsComponent} from "../administrator/statistics/statistics.component";
import {PrivacyComponent} from "../pages/privacy/privacy.component";
import {TermsComponent} from "../pages/terms/terms.component";
import {ProfileComponent} from "../partitial/auth/profile/profile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Video', component: VideoComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'admin', component: StatisticsComponent },
  { path: 'admin/stats', component: StatisticsComponent },
  { path: 'admin/users', component: UsersManagerComponent },
  { path: 'admin/institutions', component: InstitutionsManagerComponent },
  { path: 'admin/schools', component: SchoolsManagerComponent },
  { path: 'admin/subjects', component: SubjectsManagerComponent },
  { path: 'admin/lectures', component: LecturesManagerComponent },

  { path: 'admin/videos', component: VideosManagerComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
