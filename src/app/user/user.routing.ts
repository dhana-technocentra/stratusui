import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//import {PageNotFoundComponent} from './not-found.component';
import { HomeComponent } from './home/home.component';

import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard }    from '../core/guards';

const appRoutes: Routes = [
 //  {path: '**', component: PageNotFoundComponent}
    { path: 'user', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'user/login', component: LoginComponent },
    { path: 'user/register', component: RegisterComponent }
    
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
export class UserRoutingModule {}
