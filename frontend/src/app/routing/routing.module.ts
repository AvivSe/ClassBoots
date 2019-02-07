import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import {VideoComponent} from "../pages/video/video.component";
import {AboutComponent} from "../pages/about/about.component";
import {ContactComponent} from "../pages/contact/contact.component";
import {PrivacyComponent} from "../pages/privacy/privacy.component";
import {TermsComponent} from "../pages/terms/terms.component";
import {ProfileComponent} from "../partitial/auth/profile/profile.component";
import { AdminPanelComponent } from "../admin-panel/admin-panel.component";
import { AdminStatisticsComponent } from "../admin-panel/admin-statistics/admin-statistics.component";
import { AdminCollectionsManagerComponent } from "../admin-panel/admin-collections/admin-collections.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Video', component: VideoComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'admin', component: AdminPanelComponent, children: [
          { path: '', redirectTo: 'statistics', pathMatch: 'full'},
          { path: 'statistics/:about', component: AdminStatisticsComponent , outlet:'adminPanel'},
          { path: 'statistics', component: AdminStatisticsComponent , outlet:'adminPanel'},
          { path: 'collections/:about', component: AdminCollectionsManagerComponent , outlet:'adminPanel'},
          { path: 'collections', component: AdminCollectionsManagerComponent , outlet:'adminPanel'}
      ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
