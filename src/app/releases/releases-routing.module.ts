import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReleaseComponent} from "./components/releases/release.component";

const routes: Routes = [
  {
    path: "release",
    component: ReleaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleasesRoutingModule { }
