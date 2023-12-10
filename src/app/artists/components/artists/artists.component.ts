import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../../../services/users.service";
import {ArtistsService} from "../../../services/artists.service";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.css'
})
export class ArtistsComponent implements OnInit{
  artists: any[] = [];
  startCursor: string | null = null;
  endCursor: string | null = null;
  hasNextPage = true;
  hasPreviousPage = false;
  count:number = 5;

  constructor(private router: Router, private artistsService: ArtistsService) {
  }

  ngOnInit(): void {
        this.loadNext();
  }

  public loadNext(){
    this.artistsService.nextPage(this.count, this.endCursor).subscribe(result => {
      const { edges, pageInfo } = result.data.artists!;
      this.artists = new Array<any>(...edges!.map((edge: any) => edge.node));
      this.hasPreviousPage = pageInfo.hasPreviousPage;
      this.startCursor = pageInfo.startCursor!;
      this.hasNextPage = pageInfo.hasNextPage;
      this.endCursor = pageInfo.endCursor!;
    })
  }
  public loadPrev(){
    this.artistsService.prevPage(this.count, this.startCursor).subscribe(result => {
      const { edges, pageInfo } = result.data.artists!;
      this.artists = new Array<any>(...edges!.map((edge: any) => edge.node));
      this.hasPreviousPage = pageInfo.hasPreviousPage;
      this.startCursor = pageInfo.startCursor!;
      this.hasNextPage = pageInfo.hasNextPage;
      this.endCursor = pageInfo.endCursor!;
    });
  }

  navigateToArtistPage(id:string) {
    // Перенаправление на страницу формы с предзаполненными данными
    this.router.navigate
    (['artists/list/artist'], { queryParams: { id} });
  }
}
