import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {TokenResponse} from "../models/TokenResponse";
import {BaseUser, RegisterUser} from "../models/baseUser";
import {GetMeResponse} from "../models/getMeResponse";
import {Router} from "@angular/router";
import {UserInfo} from "../models/userInfo";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<UserInfo | null>;
  public user: Observable<UserInfo| null>;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    let fromCookie = cookieService.get("user");
    if(fromCookie){
      this.userSubject = new BehaviorSubject(JSON.parse(fromCookie));
    }
    else{
      this.userSubject = new BehaviorSubject<UserInfo | null>(null);
    }

    this.user = this.userSubject.asObservable();
  }

  public get userValue(){
    return this.userSubject.value;
  }

  public register(username: string, email: string, password: string): Observable<TokenResponse>{
    if (this.userValue){
      this.logout();
    }
    return this.http.post<TokenResponse>('http://localhost:8088/Authentication/register',
      {
      "username": username, "email": email, "password": password
    }
    ).pipe(map(res=>{
      this.cookieService.set("authToken", res.data);
      this.getMe().subscribe();
      return res;
    }));
  }

  public login(email: string, password: string): Observable<TokenResponse>{
    if (this.userValue){
      this.logout();
    }
    return this.http.post<TokenResponse>('http://localhost:8088/Authentication/login', {
      "email": email, "password": password
    }).pipe(map(res=>{
      this.cookieService.set("authToken", res.data);
      this.getMe().subscribe();
      return res;
    }));
  }

  public logout(): void{
    this.cookieService.delete("authToken");
    this.cookieService.delete("user");
    this.router.navigate(['/auth/login'])
  }

  public isTokenExist(): boolean{
    return this.cookieService.get("authToken") !== null;
  }

  public getMe():Observable<GetMeResponse>{
    return this.http.get<GetMeResponse>('http://localhost:8088/users').pipe(map( response =>{
        this.cookieService.set("user", JSON.stringify(response.data));
        this.userSubject.next(response.data);
        return response;
      })
    );
  }
}



