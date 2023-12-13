import {Component, OnInit} from '@angular/core';
import {Release} from "../../../models/releaseResponse";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ReleasesService} from "../../../services/releases.service";
import {firstValueFrom, Observable, switchMap} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {Role} from "../../../models/userInfo";
import {SongsService} from "../../../services/songs.service";

@Component({
  selector: 'app-releases',
  templateUrl: './release.component.html',
  styleUrl: './release.component.css'
})
export class ReleaseComponent implements OnInit{
  id:string = "123";
  release: Release = new Release();
  rolesToContentEdit: Role[] = [Role.DatabaseAdmin, Role.Admin]
  songsInFavourites: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private releasesService: ReleasesService, private songsService:SongsService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    firstValueFrom(this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id')!;
        return new Observable();
      })
    )).then();

    firstValueFrom(this.releasesService.getRelease(this.id)).then(x =>{
      this.release = x.data;
    });

    firstValueFrom(this.songsService.getFavouritesFromRelease(this.authService.userValue?.id!, this.id)).then(x =>{
      this.songsInFavourites = x.map(y=> y.node.id);
    });
  }

  isSongInFavourites(id:string){
    return this.songsInFavourites.includes(id);
  }

  addToFavourites(id:string){
    firstValueFrom(this.songsService.addToFavourites(id)).then(x=>{
      this.songsInFavourites.push(id);
    })
  }

  removeFromFavourites(id:string){
    firstValueFrom(this.songsService.removeFromFavourites(id)).then(x=>{
      this.songsInFavourites.splice(this.songsInFavourites.indexOf(id));
    })
  }

  navigateToArtist(id:string){
    this.router.navigate(['artists/list/artist'], {queryParams:{id}});
  }

  navigateToSong(link:string){
    window.open(link);
  }

  navigateToSongForm(id: string, releaseId: string){
    this.router.navigate(['songs/list/songForm'], {queryParams:{id, releaseId}});
  }

  public get accessToContentManagment(){
    const user = this.authService.userValue;
    return user && this.rolesToContentEdit.includes(user.roleId);
  }

  navigateToReleaseForm(id: string){
    this.router.navigate(['releases/release/releaseForm'], {queryParams:{id}});
  }

  deleteRelease(id: string){
    this.releasesService.deleteRelease(id).subscribe(x=>{
      this.router.navigate(['artists/list'])
    });
  }

  deleteSong(id: string){
    this.songsService.deleteSong(id).subscribe(x =>{
      if (x.message==="Success"){
        window.location.reload();
      }
    });
  }

}
