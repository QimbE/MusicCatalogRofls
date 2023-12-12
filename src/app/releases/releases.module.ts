import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ReleasesRoutingModule } from './releases-routing.module';
import {ReleaseComponent} from "./components/releases/release.component";
import {ReleaseformComponent} from "./components/releaseform/releaseform.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ReleaseComponent, ReleaseformComponent],
  imports: [
    CommonModule,
    ReleasesRoutingModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReleasesModule { }
