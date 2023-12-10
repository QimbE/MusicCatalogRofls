import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {Role} from "../../../models/userInfo";
import {ArtistsService} from "../../../services/artists.service";
import {Artist, ArtistResponse} from "../../../models/artistResponse";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit{
  id: string = "123";
  artist: Artist = new Artist();

  constructor(private route: ActivatedRoute, private artistsService: ArtistsService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id')!;
        return new Observable();
      })
    ).subscribe();

    this.artistsService.getArtist(this.id).subscribe(x => this.artist = x.data);
  }
}
