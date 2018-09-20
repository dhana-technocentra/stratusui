import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable()
export class InventoryService {

    constructor(private http: HttpClient) { }

    requestAQuote(quote: any) {
        return this.http.post(`${environment.apiUrl}/api/quote/requestQuote`, quote);
    }

    getOrdersByCompanyId(id: number) {
        return this.http.get(`${environment.apiUrl}/api/orders/getOrderSummaries?companyId=` + id);
    }
}   