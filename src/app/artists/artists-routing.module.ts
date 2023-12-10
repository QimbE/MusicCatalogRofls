import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtistsComponent} from "./components/artists/artists.component";
import {ArtistComponent} from "./components/artist/artist.component";

const routes: Routes = [
  {
  path: "list",
  component: ArtistsComponent
},
  {
  path: "list/artist",
    component: ArtistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistsRoutingModule { }
