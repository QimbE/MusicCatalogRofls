import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import {SongformComponent} from "./components/songform/songform.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [SongformComponent],
    imports: [
        CommonModule,
        SongsRoutingModule,
        ReactiveFormsModule
    ]
})
export class SongsModule { }
