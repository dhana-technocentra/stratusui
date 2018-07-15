import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';


import { CoreModule }    from '../core/core.module';
import { MaterialModule }  from '../material/material.module';
import { CustomerSupportRoutingModule }  from './customersupport.routing';

import { CustomerSupportComponent } from './customersupport.component';


@NgModule({
  declarations: [
    CustomerSupportComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    CustomerSupportRoutingModule
  ]
})
export class CustomerSupportModule { }
