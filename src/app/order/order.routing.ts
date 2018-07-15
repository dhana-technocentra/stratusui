import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { AuthGuard }    from '../core/guards';
import {OrderComponent} from './order.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
    
    
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
