import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Response, RequestOptions, Headers } from '@angular/http';
import {environment} from '../../environments/environment';
import { BaseService } from './../core/services';

@Injectable()
export class OrderService  extends BaseService{

  constructor(private http: HttpClient) {
    super();
   }

  getOrderSummariesByCompanyId(companyId: number) {
    return this.http.get(`${environment.apiUrl}/api/orders/getOrderSummaries?companyId=` + companyId)
                    .map((response:Response)=>response.json());
  }

  getOrderSummaryByOrderId(orderId: number) {
    return this.http.get(`${environment.apiUrl}/api/orders/getOrderSummary?orderId=` + orderId);
                    //.map((response:Response)=>response.json);
  }
  
  getOrderPhoneByType(orderId: number,phoneType: string) {
    const params: string = "?orderId="+ orderId + "&phoneType=" + phoneType;
    return this.http.get(`${environment.apiUrl}/api/orders/getOrderPhoneByType`+params)
                    .map((response:Response)=>response.json());
  }

  getOrderDetailByOrderId(orderId: number) {
    return this.http.get(`${environment.apiUrl}/api/orders/getOrderDetail?orderId=` + orderId);
  }

}
