import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminComponent} from "../components/admin/admin.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserFormComponent} from "../components/user-form/user-form.component";


@NgModule({
  declarations: [AdminComponent, UserFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
