import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import { GithubLoginComponent } from './github-login/github-login.component';
import { GithubService } from './github.service';
import { GithubAuthenticationComponent } from './github-authentication/github-authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubLoginComponent,
    GithubAuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
          {path: 'welcome', component: GithubLoginComponent},
          {path: 'authenticated/', component: GithubAuthenticationComponent},
          {path: '', redirectTo: 'welcome', pathMatch: 'full'},
          {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
      ]),
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
