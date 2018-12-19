import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import {VideoComponent} from "../pages/video/video.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video', component: VideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
