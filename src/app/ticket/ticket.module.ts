import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';


import { CoreModule }    from '../core/core.module';
import { MaterialModule }  from '../material/material.module';
import { TicketRoutingModule }  from './ticket.routing';

import { TicketComponent } from './ticket.component';
import { TicketService } from './ticket.service';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TextMaskModule } from 'angular2-text-mask';
@NgModule({
  declarations: [
    TicketComponent,
    NewTicketComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    TicketRoutingModule,
    TextMaskModule
  ],
  providers:[
    TicketService
  ]
})
export class TicketModule { }
