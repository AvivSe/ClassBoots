import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import {VideoComponent} from "../pages/video/video.component";
import {AboutComponent} from "../pages/about/about.component";
import {ContactComponent} from "../pages/contact/contact.component";
import {UsersManagerComponent} from "../administrator/users-manager/users-manager.component";
import {VideosManagerComponent} from "../administrator/videos-manager/videos-manager.component";
import {StatisticsComponent} from "../administrator/statistics/statistics.component";
import {PrivacyComponent} from "../pages/privacy/privacy.component";
import {TermsComponent} from "../pages/terms/terms.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Video', component: VideoComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'admin', component: StatisticsComponent },
  { path: 'admin/stats', component: StatisticsComponent },
  { path: 'admin/users', component: UsersManagerComponent },
  { path: 'admin/videos', component: VideosManagerComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
