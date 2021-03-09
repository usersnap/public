import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersnapComponent } from './usersnap/usersnap.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersnapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{ provide: Window, useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }
