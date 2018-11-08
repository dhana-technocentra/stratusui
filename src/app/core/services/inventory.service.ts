import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { BaseService } from './base.service';

@Injectable()
export class InventoryService extends BaseService {

    constructor(private http: HttpClient) { 
        super();
    }

    requestAQuote(quote: any) {
        return this.http.post(`${environment.apiUrl}/api/quote/requestQuote`, quote);
    }

    getOrdersByCompanyId(id: number) {
        return this.http.get(`${environment.apiUrl}/api/orders/getOrderSummaries?companyId=` + id);
    }

    getOrderDetailsByOrderId(id: any) {
        return this.http.get(`${environment.apiUrl}/api/orders/getOrderSummary?orderId=` + id);
    }

    getOrderDetailById(id: any) {
        return this.http.get(`${environment.apiUrl}/api/orders/getOrderDetail?orderId=` + id);
    }

    getPONsByCompanyId(id: any) {
        return this.http.get(`${environment.apiUrl}/api/orders/getPONs?companyId=` + id);
    }

    getOrderPhone(id: any) {
        return this.http.get(`${environment.apiUrl}/api/orders/getOrderPhoneByType?orderId=` + id + `&phoneType=DID`);
    }
 }   