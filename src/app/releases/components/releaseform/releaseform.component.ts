import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReleasesService} from "../../../services/releases.service";

@Component({
  selector: 'app-releaseform',
  templateUrl: './releaseform.component.html',
  styleUrl: './releaseform.component.css'
})
export class ReleaseformComponent implements OnInit {

  isCreate = true;
  id: string = '';
  authorId: string = '';
  typeId: number = 1;
  name: string = '';
  description: string = '';
  releaseDate: Date = new Date();
  linkToCover: string = '';
  releaseForm = new FormGroup({
    name: new FormControl(this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
    description: new FormControl(this.description, [Validators.required, Validators.maxLength(1000)]),
    authorId: new FormControl(this.authorId, [Validators.required, Validators.minLength(36),Validators.maxLength(36)]),
    typeId: new FormControl(this.typeId, [Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
    releaseDate: new FormControl(this.releaseDate, [Validators.required]),
    linkToCover: new FormControl(this.linkToCover, [Validators.required, Validators.maxLength(2000)])
  });

  constructor(private route: ActivatedRoute, private releasesService: ReleasesService, private router: Router) {
  }
  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      switchMap((params: ParamMap) => {
        const probId = params.get('id');
        if (probId){
          this.isCreate = false;
          this.id = probId;
        }
        this.authorId = params.get('authorId')!;
        return new Observable();
      })
    ).subscribe();

    if (this.id===""){
      this.releaseForm.get('authorId')?.setValue(this.authorId);
      return
    }

    this.releasesService.getForm(this.id).subscribe(result => {
      const edges = result.data.releases!.edges;
      if (edges?.length===0){
        return;
      }
      const node = (edges![0] as any).node
      this.name = node.name;
      this.description = node.description;
      this.authorId = node.authorId;
      this.releaseDate = node.releaseDate;
      this.linkToCover = node.linkToCover;
      this.typeId = node.typeId
      this.releaseForm = new FormGroup({
        name: new FormControl(this.name, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
        description: new FormControl(this.description, [Validators.required, Validators.maxLength(1000)]),
        authorId: new FormControl(this.authorId, [Validators.required, Validators.minLength(36),Validators.maxLength(36)]),
        typeId: new FormControl(this.typeId, [Validators.required, Validators.minLength(1),Validators.maxLength(1)]),
        releaseDate: new FormControl(this.releaseDate, [Validators.required]),
        linkToCover: new FormControl(this.linkToCover, [Validators.required, Validators.maxLength(2000)])
      });
    });
  }

  public upsertRelease(){
    let name = this.releaseForm.get('name')?.value;
    let description = this.releaseForm.get('description')?.value;
    let authorId = this.releaseForm.get('authorId')?.value;
    let releaseDate = this.releaseForm.get('releaseDate')?.value;
    let linkToCover = this.releaseForm.get('linkToCover')?.value;
    let typeId = this.releaseForm.get('typeId')?.value;

    //create
    if(this.isCreate && name && description && authorId && typeId && releaseDate && linkToCover){
      this.releasesService.createRelease(authorId, typeId, name, description, releaseDate, linkToCover).subscribe(x=>{
        this.router.navigate(['/artists/list']);
      });
    }

    //update
    if (!this.isCreate && name && description && authorId && typeId && releaseDate && linkToCover){
      this.releasesService.updateRelease(this.id, authorId, typeId, name, description, releaseDate, linkToCover).subscribe(x=>{
        this.router.navigate([`/releases/release`], {queryParams:{id: this.id}});
      });
    }

  }
}
