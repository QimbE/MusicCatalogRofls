import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { ReleasesRoutingModule } from './releases-routing.module';
import {ReleaseComponent} from "./components/releases/release.component";


@NgModule({
  declarations: [ReleaseComponent],
  imports: [
    CommonModule,
    ReleasesRoutingModule,
    NgOptimizedImage
  ]
})
export class ReleasesModule { }
