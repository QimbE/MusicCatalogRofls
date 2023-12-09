import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {UserFormComponent} from "./components/user-form/user-form.component";

const routes: Routes = [
  {
  path: 'users',
  component: AdminComponent
},
  {
    path: 'users/user-form',
    component: UserFormComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
