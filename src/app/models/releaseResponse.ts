import {APIResponse} from "./response";

export class ReleaseResponse implements APIResponse{
  message: string ="";
  data: Release = new Release();

}

export class Artist{
  id: string = "";
  name: string = "";
}
export class Genre{
  id: string = "";
  name: string = "";
}

export class Release{
  id: string = "";
  author: Artist= new Artist();
  name: string = "";
  description: string | null = "";
  type: string = "";
  releaseDate: Date = new Date();
  linkToCover: string ="";
  songs: Song[] = [];
}

export class Song{
  id: string = "";
  name: string = "";
  audioLink: string = "";
  genre: Genre = new Genre();
  artistsOnFeat: Artist[] = [];
}
