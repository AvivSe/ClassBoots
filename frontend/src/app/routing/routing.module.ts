import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { SomepageComponent } from "../pages/somepage/somepage.component";
import { HomeComponent } from "../pages/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'some', component: SomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
