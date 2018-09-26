import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';


import { CoreModule }    from '../core/core.module';
import { MaterialModule }  from '../material/material.module';
import { InventoryRoutingModule }  from './inventory.routing';

import { InventoryComponent } from './inventory.component';
import { InventorydetailsComponent } from './inventorydetails/inventorydetails.component';


@NgModule({
  declarations: [
    InventoryComponent,
    InventorydetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
