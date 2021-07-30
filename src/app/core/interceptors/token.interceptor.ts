import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { first, switchMap } from 'rxjs/operators'
import { TokenService } from 'src/app/services/token.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  )

  constructor(public tokenService: TokenService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return this.tokenService.getToken().pipe(
      first(),
      switchMap(token => {
        if(token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token.token}`
            }
          });
          return next.handle(request);
        }

          return next.handle(request);
      })
  )
  }

}
