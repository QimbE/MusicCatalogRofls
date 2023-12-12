import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReleaseComponent} from "./components/releases/release.component";
import {ReleaseformComponent} from "./components/releaseform/releaseform.component";

const routes: Routes = [
  {
    path: "release",
    component: ReleaseComponent
  },
  {
    path: "release/releaseForm",
    component: ReleaseformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleasesRoutingModule { }
