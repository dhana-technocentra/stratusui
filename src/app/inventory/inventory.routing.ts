import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { AuthGuard }    from '../core/guards';
import {InventoryComponent} from './inventory.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
    
    
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
export class InventoryRoutingModule {}
