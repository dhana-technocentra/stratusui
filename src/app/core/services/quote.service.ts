import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Quote } from '../models/quote';

@Injectable()
export class QuoteService {

    constructor(private http: HttpClient) { }

    requestAQuote(quote: Quote) {
        return this.http.post(`${environment.apiUrl}/api/quote/requestQuote`, quote);
    }

    getServices() {
        return this.http.get(`${environment.apiUrl}/api/quote/getQuotableServices`);
    }
}   