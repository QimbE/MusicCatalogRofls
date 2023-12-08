import {APIResponse} from "./response";

export class TokenResponse implements APIResponse{
  message: string = "";
  data: string = "";
}
