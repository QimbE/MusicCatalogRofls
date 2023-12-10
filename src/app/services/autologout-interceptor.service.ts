import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpEvent, HttpHandler, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AutologoutInterceptor {

  private readonly statusCodes : number[] = [401]
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (this.statusCodes.includes(err.status) && this.authenticationService.isTokenExist()) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        this.authenticationService.logout();
        window.location.reload();
      }

      const error = err.error.message || err.statusText;
      return throwError(() => error);
    }));
  }
}
