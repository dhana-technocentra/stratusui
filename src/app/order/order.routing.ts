import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { AuthGuard }    from '../core/guards';
import { OrderComponent} from './order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderPhoneComponent }  from './order-phone/order-phone.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'order/getordersummariesbycompanyid', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'order/getordersummarybyorderid', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'order/getorderdetailbyorderid', component: OrderDetailComponent, canActivate: [AuthGuard] },
    { path: 'order/getorderphonebytype', component: OrderPhoneComponent, canActivate: [AuthGuard] }
    
    
    
];

@NgModule({
  imports: [
    RouterModule.forChild(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class OrderRoutingModule {}
