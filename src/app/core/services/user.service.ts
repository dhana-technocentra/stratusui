import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { UserProfile } from '../models';
import { User } from '../models';

import { Phone } from '../models';

@Injectable()
export class UserService {	
	
    constructor(private http: HttpClient) { }

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

    getUserProfile(userId: string){
        return this.http.get(`${environment.apiUrl}/api/profile/getUserProfile?userId=` + userId);
    }

    updateUserProfile(userProfile: UserProfile) {
        console.log('update userProfile', userProfile);
        return this.http.post(`${environment.apiUrl}/api/profile/updateUserProfile`, JSON.stringify(userProfile));
    }

    updatePassword(user: User) {
        return this.http.put(`${environment.apiUrl}/api/profile/updatePassword`, user);
    }
}   