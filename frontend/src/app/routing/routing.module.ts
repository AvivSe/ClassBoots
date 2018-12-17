import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { SomepageComponent } from "../pages/somepage/somepage.component";
import { HomeComponent } from "../pages/home/home.component";
import { ShirComponent } from "../pages/shir/shir.component";
import { RegisterComponent } from "../pages/user/register/register.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'some', component: SomepageComponent },
  { path: 'shir', component: ShirComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
