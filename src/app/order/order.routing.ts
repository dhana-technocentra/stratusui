import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { AuthGuard }    from '../core/guards';
import { OrderComponent} from './order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'order/getOrderSummaryByOrderId', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'order/getOrderDetailByOrderId', component: OrderDetailComponent, canActivate: [AuthGuard] }    
    
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
