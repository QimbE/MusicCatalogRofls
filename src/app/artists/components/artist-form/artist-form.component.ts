import {Component, OnInit} from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ArtistsService} from "../../../services/artists.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrl: './artist-form.component.css'
})
export class ArtistFormComponent implements OnInit{
  id: string = "";
  name: string = "";
  description: string | null = "";
  isCreate = true;

  artistForm = new FormGroup({
    name: new FormControl(this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
    description: new FormControl(this.description, [Validators.required, Validators.maxLength(2000)])
  });

  constructor(private route: ActivatedRoute, private artistsService: ArtistsService, private router: Router) {
  }
  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        const probId = params.get('id');
        if (probId){
          this.isCreate = false;
          this.id = probId;
        }
        return new Observable();
      })
    ).subscribe();

    if (this.id===""){
      return
    }

    this.artistsService.getForm(this.id).subscribe(result => {
      const edges = result.data.artists!.edges;
      if (edges?.length===0){
        return;
      }
      const node = (edges![0] as any).node
      this.name = node.name;
      this.description = node.description;
      this.artistForm = new FormGroup({
        name: new FormControl(this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
        description: new FormControl(this.description, [Validators.required, Validators.maxLength(2000)])
      });
    });
  }

  public upsertArtist(){
    let name = this.artistForm.get('name')?.value;
    let description = this.artistForm.get('description')?.value;

    //create
    if(this.isCreate && name && description){
        this.artistsService.createArtist(name, description).subscribe(x=>{
          this.router.navigate(['/artists/list']);
        });
    }

    //update
    if (!this.isCreate && name && description){
        this.artistsService.updateArtist(this.id, name, description).subscribe(x=>{
          this.router.navigate(['/artists/list']);
        });
    }

  }

}
