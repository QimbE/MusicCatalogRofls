import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {SongsService} from "../../services/songs.service";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-songs-list',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TitleCasePipe
  ],
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.css'
})
export class SongsListComponent implements OnInit{
  songs: any[] = [];
  startCursor: string | null = null;
  endCursor: string | null = null;
  hasNextPage = true;
  hasPreviousPage = false;
  count:number = 10;
  userId: string | null = null;

  constructor(private router: Router, private songsService: SongsService, private authService: AuthenticationService) {
  }

  ngOnInit():void {
    this.userId = this.authService.userValue?.id!;

    this.loadNext();
  }

  public loadNext(){
    this.songsService.nextPage(this.count, this.endCursor, this.userId).subscribe(result => {
      const { edges, pageInfo } = result.data.songs!;
      this.songs = new Array<any>(...edges!.map((edge: any) => edge.node));
      this.hasPreviousPage = pageInfo.hasPreviousPage;
      this.startCursor = pageInfo.startCursor!;
      this.hasNextPage = pageInfo.hasNextPage;
      this.endCursor = pageInfo.endCursor!;
    })
  }
  public loadPrev(){
    this.songsService.prevPage(this.count, this.startCursor, this.userId).subscribe(result => {
      const { edges, pageInfo } = result.data.songs!;
      this.songs = new Array<any>(...edges!.map((edge: any) => edge.node));
      this.hasPreviousPage = pageInfo.hasPreviousPage;
      this.startCursor = pageInfo.startCursor!;
      this.hasNextPage = pageInfo.hasNextPage;
      this.endCursor = pageInfo.endCursor!;
    });
  }
  removeFromFavourites(id:string){
    firstValueFrom(this.songsService.removeFromFavourites(id)).then(x=>{
        window.location.reload();
    })
  }

  navigateToAudio(link:string){
    window.open(link);
  }

  navigateToArtistPage(id: string){
    this.router.navigate(['artists/list/artist'], {queryParams:{id}})
  }

  navigateToReleasePage(id: string){
    this.router.navigate(['releases/release'], {queryParams:{id}})
  }
}
