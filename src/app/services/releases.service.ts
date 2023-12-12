import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIResponse} from "../models/response";
import {ListReleasesGQL, ReleaseFormGQL} from "../../generated/graphql";
import {ReleaseResponse} from "../models/releaseResponse";

@Injectable({
  providedIn: 'root'
})
export class ReleasesService {

  constructor(private httpClient: HttpClient, private query: ListReleasesGQL, private formQuery: ReleaseFormGQL) {

  }

  public deleteRelease(id: string){
    return this.httpClient.delete<APIResponse>(`http://localhost:8088/Releases/${id}`);
  }

  public createRelease(authorId: string, typeId: number, name: string, description:string, releaseDate:Date, linkToCover:string){
    return this.httpClient.post<APIResponse>('http://localhost:8088/Releases', {
      authorId:authorId,
      typeId:typeId,
      name:name,
      description:description,
      releaseDate:releaseDate,
      linkToCover:linkToCover
    });
  }

  public updateRelease(id: string, authorId: string, typeId: number, name: string, description:string, releaseDate:Date, linkToCover:string){
    return this.httpClient.put<APIResponse>(`http://localhost:8088/Releases`, {
      id: id,
      authorId:authorId,
      typeId:typeId,
      name:name,
      description:description,
      releaseDate:releaseDate,
      linkToCover:linkToCover
    });
  }

  public getForm(id: string){
    return this.formQuery.watch({id: id})
      .valueChanges
  }

  public getRelease(id: string){
    return this.httpClient.get<ReleaseResponse>(`http://localhost:8088/Releases/${id}`);
  }

  public prevPage(last:number, startCursor: string | null){
    return this.query.watch({last: last, before: startCursor })
      .valueChanges
  }

  public nextPage(first:number, endCursor: string | null){
    return this.query.watch({first: first, after: endCursor })
      .valueChanges
  }
}
