import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ArtistsService} from "../../../services/artists.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {Role} from "../../../models/userInfo";

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
  rolesToContentEdit: Role[] = [Role.DatabaseAdmin, Role.Admin]

  constructor(private router: Router, private artistsService: ArtistsService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
        this.loadNext();
  }

  public get accessToContentManagment(){
    const user = this.authService.userValue;
    return user && this.rolesToContentEdit.includes(user.roleId);
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
    this.router.navigate
    (['artists/list/artist'], { queryParams: { id} });
  }

  navigateToEditArtistForm(id:string){
    this.router.navigate
    (['artists/list/upsert'], { queryParams: { id} });
  }

  navigateToAddArtistForm(){
    this.router.navigate
    (['artists/list/upsert']);
  }

  deleteArtist(id: string){
      this.artistsService.deleteArtist(id).subscribe(x=> window.location.reload());
  }

}
