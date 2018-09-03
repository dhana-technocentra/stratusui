import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Ticket } from './../core/models';
import { BaseService } from './../core/services';

@Injectable()
export class TicketService extends BaseService{

  constructor(private http: HttpClient) { 
    super();
  }

  getTicketNotes(companyId: number) {
    return this.http.get(`${environment.apiUrl}/api/tickets/getTicketNotes?companyId=` + companyId);
  }

  openNewTicket(ticket: Ticket) {
    console.log('update ticket', ticket);
    return this.http.post(`${environment.apiUrl}/api/tickets/openNewTicket`, JSON.stringify(ticket), this.getOptions());
  }  

}
