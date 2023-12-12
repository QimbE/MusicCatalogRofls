import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongformComponent} from "./components/songform/songform.component";

const routes: Routes = [
  {
    path: "list/songForm",
    component: SongformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
