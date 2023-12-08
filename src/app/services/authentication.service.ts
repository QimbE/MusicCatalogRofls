import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenResponse} from "../models/TokenResponse";
import {BaseUser, RegisterUser} from "../models/baseUser";
import {GetMeResponse} from "../models/getMeResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public register(user: RegisterUser): Observable<TokenResponse>{
    return this.http.post<TokenResponse>('http://localhost:8088/Authentication/register', user);
  }

  public login(user: BaseUser): Observable<TokenResponse>{
    return this.http.post<TokenResponse>('http://localhost:8088/Authentication/login', user);
  }

  public logout(): void{
    localStorage.removeItem("authToken")
  }

  public isTokenExist(): boolean{
    return localStorage.getItem("authToken") !== null;
  }

  public getMe():Observable<GetMeResponse>{
    return this.http.get<GetMeResponse>('http://localhost:8088/users');
  }
}



