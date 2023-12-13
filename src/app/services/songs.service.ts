import { Injectable } from '@angular/core';
import {APIResponse} from "../models/response";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FavouritesFromReleaseGQL, GenreExistGQL, ListSongsGQL, SongFormGQL} from "../../generated/graphql";
import {GenreResponse} from "../models/genreResponse";

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private httpClient: HttpClient, private isExist: GenreExistGQL, private songForm: SongFormGQL, private query: ListSongsGQL, private favouritesFromRelease: FavouritesFromReleaseGQL) {

  }

  public addToFavourites(id: string){
    return this.httpClient.post<APIResponse>("http://localhost:8088/Favourites", {id});
  }
  public removeFromFavourites(id: string){
    return this.httpClient.delete<APIResponse>("http://localhost:8088/Favourites", {body:{id}});
  }
  public getFavouritesFromRelease(userId:string, releaseId:string){
    return this.favouritesFromRelease.watch({userId: userId, releaseId: releaseId}).valueChanges.pipe(map(x=>{
      return x.data.songs!.edges!;
    }))
  }

  public createSong(releaseId: string, genreId: string, name: string, audioLink: string, artistOnFeatIds:string[]){
    return this.httpClient.post<APIResponse>(`http://localhost:8088/Songs`, {
      releaseId: releaseId,
      genreId: genreId,
      name: name,
      audioLink: audioLink,
      artistOnFeatIds: artistOnFeatIds
    });
  }
  public updateSong(id:string, releaseId: string, genreId: string, name: string, audioLink: string, artistOnFeatIds:string[]){
    return this.httpClient.put<APIResponse>(`http://localhost:8088/Songs`, {
      id: id,
      releaseId: releaseId,
      genreId: genreId,
      name: name,
      audioLink: audioLink,
      artistOnFeatIds: artistOnFeatIds
    });
  }

  public getForm(id: string){
    return this.songForm.watch({id: id}).valueChanges.pipe(map(x=>{
      return x.data.songs?.edges![0].node;
    }))
  }

  public deleteSong(id: string){
    return this.httpClient.delete<APIResponse>(`http://localhost:8088/Songs`, {body:{id: id}});
  }

  public checkIfGenreExists(name: string){
    return this.isExist.watch({name: name}).valueChanges.pipe(map(x=>{
      if(x.data.genres?.edges?.length!>0){
        return x.data.genres?.edges![0].node.id as string;
      }
      return ''
    }))
  }

  public createGenre(name: string){
    return this.httpClient.post<GenreResponse>('http://localhost:8088/Genres', {
      name:name,
    }).pipe(map(x=>{
      return x.data;
    }));
  }

  public updateGenre(id: string, name: string){
    return this.httpClient.put<APIResponse>(`http://localhost:8088/Genres`, {
      id: id,
      name:name
    });
  }

  public prevPage(last:number, startCursor: string | null, userId: string | null){
    return this.query.watch({last: last, before: startCursor, userId: userId})
      .valueChanges
  }

  public nextPage(first:number, endCursor: string | null, userId: string | null){
    return this.query.watch({first: first, after: endCursor, userId: userId })
      .valueChanges
  }
}
