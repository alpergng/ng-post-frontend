import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Ng2Webstorage} from 'ngx-webstorage';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {HttpClientInterceptor} from './http-client-interceptor';
import {AuthGuard} from './auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AddPostComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'home', component: HomeComponent},
      {path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]}
    ]),
    HttpClientModule,
    EditorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
