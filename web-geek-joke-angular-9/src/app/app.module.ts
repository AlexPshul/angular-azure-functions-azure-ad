import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalInterceptor, MsalGuard } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "**", component: AppComponent, canActivate: [MsalGuard] }
];

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(message);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MsalModule.forRoot({
      clientID: environment.aadClientId,
      redirectUri: environment.redirectUrl,
      authority: "https://login.microsoftonline.com/common",
      consentScopes: [environment.aadUserReadScope],
      protectedResourceMap: [[environment.apiBaseUrl, [environment.aadUserReadScope]]],
      logger: loggerCallback
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
