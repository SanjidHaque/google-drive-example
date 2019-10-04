import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GapiSession} from './gapi.session';



export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    GapiSession,
    { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
