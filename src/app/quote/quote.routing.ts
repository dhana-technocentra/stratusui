import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//import {PageNotFoundComponent} from './not-found.component';
import { QuoteComponent } from './quote.component';

import { AuthGuard }    from '../core/guards';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'quote', component: QuoteComponent, canActivate: [AuthGuard] }
    
    
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
export class QuoteRoutingModule {}
