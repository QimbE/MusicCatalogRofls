import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import {ArtistsComponent} from "./components/artists/artists.component";
import {ArtistComponent} from "./components/artist/artist.component";


@NgModule({
  declarations: [ArtistsComponent, ArtistComponent],
  imports: [
    CommonModule,
    ArtistsRoutingModule
  ]
})
export class ArtistsModule { }
