import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentType } from '@angular/http/src/enums';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let access_token = JSON.parse(localStorage.getItem('access_token'));
        console.log('JwtInterceptor currentUser',currentUser, access_token) ;        

        if (currentUser && access_token) {
            let headers = request.headers
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${access_token}`);

            request = request.clone({headers});

            console.log('request',request);
        }

        return next.handle(request);
    }
}   