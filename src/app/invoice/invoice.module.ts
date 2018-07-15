import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';


import { CoreModule }    from '../core/core.module';
import { MaterialModule }  from '../material/material.module';
import { InvoiceRoutingModule }  from './invoice.routing';

import { InvoiceComponent } from './invoice.component';


@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
