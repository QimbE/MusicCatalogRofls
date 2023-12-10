import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArtistFormGQL, ListArtistsGQL} from "../../generated/graphql";
import {ArtistResponse} from "../models/artistResponse";
import {APIResponse} from "../models/response";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private httpClient: HttpClient, private query: ListArtistsGQL, private formQuery: ArtistFormGQL) {

  }

  public deleteArtist(id: string){
    return this.httpClient.delete<APIResponse>(`http://localhost:8088/Artists/${id}`);
  }

  public createArtist(name: string, description: string){
      return this.httpClient.post<APIResponse>('http://localhost:8088/Artists', {name: name, description: description});
  }

  public updateArtist(id: string, name: string, description: string){
    return this.httpClient.put<APIResponse>(`http://localhost:8088/Artists/${id}`, {name: name, description: description});
  }

  public getForm(id: string){
    return this.formQuery.watch({id: id})
      .valueChanges
  }

  public getArtist(id: string){
    return this.httpClient.get<ArtistResponse>(`http://localhost:8088/Artists/${id}`);
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
