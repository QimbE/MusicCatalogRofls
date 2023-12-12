import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {Role} from "../../../models/userInfo";
import {ArtistsService} from "../../../services/artists.service";
import {Artist, ArtistResponse} from "../../../models/artistResponse";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit{
  id: string = "123";
  artist: Artist = new Artist();
  rolesToContentEdit: Role[] = [Role.DatabaseAdmin, Role.Admin]

  constructor(private route: ActivatedRoute, private router: Router, private artistsService: ArtistsService, private authService: AuthenticationService) {
  }

  public get accessToContentManagment(){
    const user = this.authService.userValue;
    return user && this.rolesToContentEdit.includes(user.roleId);
  }
  navigateToRelease(id: string){
    this.router.navigate(['releases/release'], {queryParams:{id}})
  }

  navigateToReleaseForm(id: string, authorId:string){
    this.router.navigate(['releases/release/releaseForm'], {queryParams:{id, authorId}})
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
