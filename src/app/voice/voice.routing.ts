import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { AuthGuard }    from '../core/guards';
import {VoiceComponent} from './voice.component';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'voice', component: VoiceComponent, canActivate: [AuthGuard] },
    
    
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
export class VoiceRoutingModule {}