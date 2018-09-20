import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Response, RequestOptions, Headers } from '@angular/http';
import {environment} from '../../../environments/environment';
import { UserProfile } from '../models';
import { User } from '../models';

import { Phone } from '../models';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService{	
	
    constructor(private http: HttpClient) { 
        super();
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/api/profile/createNewUser`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }

    getUserProfile(){
        return this.http.get(`${environment.apiUrl}/api/profile/getUserProfile`);
    }

    updateUserProfile(userProfile: UserProfile) {
        console.log('update userProfile', userProfile);
        return this.http.post(`${environment.apiUrl}/api/profile/updateUserProfile`, JSON.stringify(userProfile), this.getOptions());
    }

    updatePassword(passwordObject: any) {
        return this.http.post(`${environment.apiUrl}/api/profile/updatePassword`, JSON.stringify(passwordObject), this.getOptions());
    }   
}   