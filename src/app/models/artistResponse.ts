import {APIResponse} from "./response";

export class Artist{
  id: string ="";
  name: string ="";
  description: string | null = "";
  releases: ReleaseFromArtistResponse[] = [];
}

export class ArtistResponse implements APIResponse{
  message: string = "";
  data: Artist = new Artist();
}

export class ReleaseFromArtistResponse{
  id: string ="";
  name: string ="";
  type: string = "";
  releaseDate: Date = new Date();
  linkToCover: string = "";
}
