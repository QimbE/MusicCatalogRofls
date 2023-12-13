import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {firstValueFrom, map, Observable, switchMap} from "rxjs";
import {ArtistsService} from "../../../services/artists.service";
import {SongsService} from "../../../services/songs.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-songform',
  templateUrl: './songform.component.html',
  styleUrl: './songform.component.css'
})
export class SongformComponent implements OnInit{


  isCreate = true;
  id: string = '';
  releaseId: string = '';
  genreId: string = '';
  name: string = '';
  audioLink: string = '';
  artistOnFeatIds: string[] = [];

  songForm = new FormGroup({
    name: new FormControl(this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
    genreName: new FormControl("Pop", [Validators.required, Validators.minLength(1),Validators.maxLength(100)]),
    audioLink: new FormControl(this.audioLink, [Validators.required, Validators.maxLength(2000)]),
    artistOnFeatIds: new FormArray(this.artistOnFeatIds.map(x=> new FormControl(x, [Validators.minLength(36), Validators.maxLength(36)])))
  });

  constructor(private route: ActivatedRoute, private songsService: SongsService, private router: Router) {
  }

  get artistOnFeatIdsFormArray() {
    return this.songForm.controls["artistOnFeatIds"] as FormArray;
  }

  // You can call this method to add artist IDs dynamically
  addArtistId() {
    this.artistOnFeatIdsFormArray.push(new FormControl('', [Validators.minLength(36), Validators.maxLength(36)]));
  }

  // You can call this method to remove a specific artist ID
  removeArtistId(index: number) {
    this.artistOnFeatIdsFormArray.removeAt(index);
  }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        const probId = params.get('id');
        if (probId){
          this.isCreate = false;
          this.id = probId;
        }
        this.releaseId = params.get('releaseId')!;
        return new Observable();
      })
    ).subscribe();

    if(this.isCreate){
      return;
    }

    this.songsService.getForm(this.id).subscribe(x=>{
      if (!x){
        return
      }
      this.name = x.name;
      this.genreId = x.genreId;
      this.audioLink =x.audioLink;
      this.artistOnFeatIds = x.artistsOnFeat.map(y=> y.id as string);

      this.songForm = new FormGroup({
        name: new FormControl(this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(150)]),
        genreName: new FormControl("Pop", [Validators.required, Validators.minLength(1),Validators.maxLength(100)]),
        audioLink: new FormControl(this.audioLink, [Validators.required, Validators.maxLength(2000)]),
        artistOnFeatIds: new FormArray(this.artistOnFeatIds.map(x=> new FormControl(x, [Validators.minLength(36), Validators.maxLength(36)])))
      });
    });
  }

  public async upsertSong(){
    let name = this.songForm.get('name')?.value;
    let artistOnFeatIds = this.songForm.get('artistOnFeatIds')?.value;
    let audioLink = this.songForm.get('audioLink')?.value;
    let genreName = this.songForm.get('genreName')?.value;

    let genreId: string = await firstValueFrom(this.songsService.checkIfGenreExists(genreName!));


    if (genreId==''){
      genreId = await firstValueFrom(this.songsService.createGenre(genreName!));
    }

    //create
    if(this.isCreate && name && artistOnFeatIds && audioLink && genreId){
      this.songsService.createSong(this.releaseId, genreId, name, audioLink, artistOnFeatIds.map(x=> x!)).subscribe(x=>{
        this.router.navigate(['releases/release'], {queryParams: {id: this.releaseId}})
      });
    }

    //update
    if (!this.isCreate && name && artistOnFeatIds && audioLink && genreId){
      this.songsService.updateSong(this.id, this.releaseId, genreId, name, audioLink, artistOnFeatIds.map(x=> x!)).subscribe(x=>{
        this.router.navigate(['releases/release'], {queryParams: {id: this.releaseId}})
      });
    }
  }
}
