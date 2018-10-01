import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';


import { CoreModule }    from '../core/core.module';
import { MaterialModule }  from '../material/material.module';
import { UserRoutingModule }  from './user.routing';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { UserPasswordComponent } from './userpassword/userpassword.component';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    UserPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    MaterialModule,
    UserRoutingModule,
    FormsModule,
    TextMaskModule
  ]
})
export class UserModule { }
