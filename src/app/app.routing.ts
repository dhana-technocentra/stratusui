import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/user', pathMatch: 'full' },
    { path: 'customersupport', redirectTo: '/customersupport', pathMatch: 'full' },
    { path: 'ticket', redirectTo: '/ticket', pathMatch: 'full' }
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
