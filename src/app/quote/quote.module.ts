import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, ControlContainer, FormGroup, FormControl, FormsModule }    from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';


import { CoreModule }    from '../core/core.module';
import { MaterialModule }  from '../material/material.module';
import { QuoteRoutingModule }  from './quote.routing';

import { QuoteComponent } from './quote.component';



@NgModule({
  declarations: [
    QuoteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    QuoteRoutingModule,
    FormsModule
  ]
})
export class QuoteModule { }
