import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CoreModule }    from './core/core.module';
import { AppRoutingModule }  from './app.routing';
import { UserModule }    from './user/user.module';
import { OrderModule }    from './order/order.module';
import { TicketModule }    from './ticket/ticket.module';
import { QuoteModule }    from './quote/quote.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InventoryModule } from './inventory/inventory.module';
import { CustomerSupportModule } from './customersupport/customersupport.module';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [    
    CoreModule,
    AppRoutingModule,
    UserModule,
    OrderModule,
    TicketModule,
    QuoteModule,
    InvoiceModule,
    InventoryModule,
    CustomerSupportModule,
    HttpModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
