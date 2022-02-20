import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BasicComponent } from 'src/examples/basic/basic.component';
import { CustomButtonComponent } from 'src/examples/customButton/customButton.component';
import { CustomDisplayLogicComponent } from 'src/examples/customDisplayLogic/customDisplayLogic.component';
import { NativeScreenshotComponent } from 'src/examples/nativeScreenshot/nativeScreenshot.component';
import { NativeScreenshotInNewTabComponent } from 'src/examples/nativeScreenshotInNewTab/nativeScreenshotInNewTab.component';
import { OnlyForLoggedInUsersComponent } from 'src/examples/onlyForLoggedInUsers/onlyForLoggedInUsers.component';
import { OnlyWithCertainEmailsComponent } from 'src/examples/onlyWithCertainEmails/onlyWithCertainEmails.component';
import { OtherWidgetOptionsComponent } from 'src/examples/otherWidgetOptions/otherWidgetOptions.component';
import { PassInitialValuesComponent } from 'src/examples/passInitialValues/passInitialValues.component';
import { WidgetApiEventsComponent } from 'src/examples/widgetApiEvents/widgetApiEvents.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    CustomButtonComponent,
    OnlyForLoggedInUsersComponent,
    OnlyWithCertainEmailsComponent,
    CustomDisplayLogicComponent,
    PassInitialValuesComponent,
    WidgetApiEventsComponent,
    NativeScreenshotComponent,
    NativeScreenshotInNewTabComponent,
    OtherWidgetOptionsComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
