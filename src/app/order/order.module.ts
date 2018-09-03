import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';


import { CoreModule }    from '../core/core.module';
import { MaterialModule }  from '../material/material.module';
import { OrderRoutingModule }  from './order.routing';

import { OrderComponent } from './order.component';
import { OrderService } from './order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderPhoneComponent } from './order-phone/order-phone.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailComponent,
    OrderPhoneComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    OrderRoutingModule
  ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
