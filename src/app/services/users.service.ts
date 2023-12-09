import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIResponse} from "../models/response";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public editUser(id: string, username: string, roleId: number): Observable<APIResponse>{
    return this.httpClient.put<APIResponse>('http://localhost:8088/Users', {"id": id, "username": username, "roleId": roleId});
  }
}
