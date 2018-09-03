import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuoteComponent} from './quote/quote.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/user', pathMatch: 'full' },
    { path: 'customersupport', redirectTo: '/customersupport', pathMatch: 'full', data: {title: 'Customer Support'} },
    { path: 'ticket', redirectTo: '/ticket', pathMatch: 'full', data: {title: 'Ticket'} },
    { path: 'quote', component: QuoteComponent, data: {title: 'Request Quote'}}
    //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
