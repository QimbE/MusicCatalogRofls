import {Component, OnInit} from '@angular/core';
import {Release} from "../../../models/releaseResponse";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ReleasesService} from "../../../services/releases.service";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-releases',
  templateUrl: './release.component.html',
  styleUrl: './release.component.css'
})
export class ReleaseComponent implements OnInit{
  id:string = "123";
  release: Release = new Release();

  constructor(private router: Router, private route: ActivatedRoute, private releasesService: ReleasesService) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id')!;
        return new Observable();
      })
    ).subscribe();

    this.releasesService.getRelease(this.id).subscribe(({data}) =>{
      this.release = data;
    });
  }

  navigateToArtist(id:string){
    this.router.navigate(['artists/list/artist'], {queryParams:{id}});
  }

  navigateToSong(link:string){
    window.open(link);
  }

}
