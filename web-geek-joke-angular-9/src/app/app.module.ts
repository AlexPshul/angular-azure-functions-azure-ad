import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalInterceptor, MsalGuard, MsalAngularConfiguration, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalService } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { RouterModule, Routes } from "@angular/router";
import { Configuration, Logger } from 'msal';

const routes: Routes = [
  { path: "**", component: AppComponent, canActivate: [MsalGuard] }
];

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(message);
}

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: environment.aadClientId,
      redirectUri: environment.redirectUrl,
      authority: "https://login.microsoftonline.com/common"
    },
    system: {
      logger: new Logger(loggerCallback)
    }
  }
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    consentScopes: [environment.aadUserReadScope],
    protectedResourceMap: [[environment.apiBaseUrl, [environment.aadUserReadScope]]]
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MsalModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(msalService: MsalService) {
    msalService.handleRedirectCallback(_ => { });
  }
}
