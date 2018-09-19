import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthenticationService {
    private servicesUrl: string = environment.apiUrl;
    private oAuthUserName = environment.oAuthUserName;
    private oAuthPassword = environment.password;
    constructor(private http: Http) { }

    login(userObject: any): Observable<any> {
        console.log('userObject',userObject);
        const headers = new Headers();
        const options = new RequestOptions({ headers: this.getHeaders() });
       
        let creds="client_id="+ userObject.client_id + "&username="+userObject.username + "&password="+userObject.password + "&grant_type=password";
        console.log('creds',creds);
        return this.http.post(`${environment.apiUrl}/oauth/token`, creds, options)
            .map(user => {
                console.log('authenticated user', user , user.json()["access_token"]);
                // login successful if there's a jwt token in the response
                if (user && user.json()["access_token"]) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('user_name', JSON.stringify(user.json()["username"]));
                    localStorage.setItem('access_token', JSON.stringify(user.json()["access_token"]));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('user_name');
        localStorage.removeItem('access_token');
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('access_token');
        
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        return false;
       // return !jwtHelper.isTokenExpired(token);
      }

    private getHeaders() {
        const headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.oAuthUserName + ":" + this.oAuthPassword));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
      
        return headers;
    }
}

