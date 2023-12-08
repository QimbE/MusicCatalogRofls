import {BaseUser} from "./baseUser";

export class UserInfo{
  id:string = "";
  username = "";
  role: Role = 1;

}

export enum Role{
  Default = 1,
  DatabaseAdmin = 2,
  Admin = 3
}
