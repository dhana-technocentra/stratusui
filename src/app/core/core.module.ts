import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { MaterialModule }    from '../material/material.module';
import { AuthGuard } from  './guards';
import { NavComponent } from './nav/nav.component';
import {AlertComponent} from './directives';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AlertService, AuthenticationService, UserService,LoggerService,  } from './services';

// used to create fake backend
import { fakeBackendProvider } from './helpers';
import { QuoteService } from './services/quote.service';
import { InventoryService } from './services/inventory.service';
import { IFrameService } from './services/iframe.service';
 
@NgModule({
  imports: [
    CommonModule // we use ngFor
   
  ],
  exports: [
            NavComponent,
            AlertComponent,
           //MaterialModule,
            //UserService        
           ],
  declarations: [
                  NavComponent,
                  AlertComponent,
                  //MaterialModule 
                ],
  providers: [              
              AlertService,
              AuthenticationService,
              UserService,
              QuoteService,
              InventoryService,
              IFrameService,
              { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

              // provider used to create fake backend
              fakeBackendProvider,
              LoggerService,
              AuthGuard
            ]
})
export class CoreModule {
constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}