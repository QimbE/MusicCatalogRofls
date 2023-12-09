import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {APIResponse} from "../models/response";
import {UsersGQL} from "../../generated/graphql";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient, private query: UsersGQL) { }

  public editUser(id: string, username: string, roleId: number): Observable<APIResponse>{
    return this.httpClient.put<APIResponse>('http://localhost:8088/Users', {"id": id, "username": username, "roleId": roleId});
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
