import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListArtistsGQL} from "../../generated/graphql";
import {ArtistResponse} from "../models/artistResponse";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  constructor(private httpClient: HttpClient, private query: ListArtistsGQL) {

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
