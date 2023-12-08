import {APIResponse} from "./response";
import {UserInfo} from "./userInfo";

export class GetMeResponse implements APIResponse{
  message: string = "";
  data: UserInfo = new UserInfo();
}
