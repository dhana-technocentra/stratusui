import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { AuthGuard }    from '../core/guards';
import {InvoiceComponent} from './invoice.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
    
    
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
export class InvoiceRoutingModule {}
