import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import {ArtistsComponent} from "./components/artists/artists.component";
import {ArtistComponent} from "./components/artist/artist.component";
import {ArtistFormComponent} from "./components/artist-form/artist-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ArtistsComponent, ArtistComponent, ArtistFormComponent],
    imports: [
        CommonModule,
        ArtistsRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ArtistsModule { }
