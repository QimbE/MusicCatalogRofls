import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtistsComponent} from "./components/artists/artists.component";
import {ArtistComponent} from "./components/artist/artist.component";
import {ArtistFormComponent} from "./components/artist-form/artist-form.component";

const routes: Routes = [
  {
  path: "list",
  component: ArtistsComponent
},
  {
  path: "list/artist",
    component: ArtistComponent
},
  {
    path: "list/upsert",
    component: ArtistFormComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule { }
