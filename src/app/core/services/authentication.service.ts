import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthenticationService {
    private servicesUrl: string = environment.apiUrl;
    private oAuthUserName = environment.oAuthUserName;
    private oAuthPassword = environment.password;
    constructor(private http: Http) { }

    login(params: any): Observable<any> {
        const headers = new Headers();
        const options = new RequestOptions({ headers: this.getHeaders() });
        console.log(params, options);
        return this.http.post(`${environment.apiUrl}/oauth/token`, params, options)
            .map(user => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user["token"]) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    private getHeaders() {
        const headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.oAuthUserName + ":" + this.oAuthPassword));
        headers.append("Content-Type", "multipart/form-data");
        return headers;
    }
}

