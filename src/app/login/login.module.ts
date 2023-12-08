import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "../components/login/login.component";
import {RegisterComponent} from "../components/register/register.component";


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
