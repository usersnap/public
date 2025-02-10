import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BasicComponent } from "../examples/basic/basic.component";
import { CustomButtonComponent } from "../examples/customButton/customButton.component";
import { CustomDisplayLogicComponent } from "../examples/customDisplayLogic/customDisplayLogic.component";
import { NativeScreenshotComponent } from "../examples/nativeScreenshot/nativeScreenshot.component";
import { NativeScreenshotInNewTabComponent } from "../examples/nativeScreenshotInNewTab/nativeScreenshotInNewTab.component";
import { OnlyForLoggedInUsersComponent } from "../examples/onlyForLoggedInUsers/onlyForLoggedInUsers.component";
import { OnlyWithCertainEmailsComponent } from "../examples/onlyWithCertainEmails/onlyWithCertainEmails.component";
import { OtherWidgetOptionsComponent } from "../examples/otherWidgetOptions/otherWidgetOptions.component";
import { PassHiddenValuesComponent } from "../examples/passHiddenValues/passHiddenValues.component";
import { PassInitialValuesComponent } from "../examples/passInitialValues/passInitialValues.component";
import { WidgetApiEventsComponent } from "../examples/widgetApiEvents/widgetApiEvents.component";

import { AppComponent } from "./app.component";

@NgModule({
	declarations: [
		AppComponent,
		BasicComponent,
		CustomButtonComponent,
		OnlyForLoggedInUsersComponent,
		OnlyWithCertainEmailsComponent,
		CustomDisplayLogicComponent,
		PassInitialValuesComponent,
		PassHiddenValuesComponent,
		WidgetApiEventsComponent,
		NativeScreenshotComponent,
		NativeScreenshotInNewTabComponent,
		OtherWidgetOptionsComponent,
	],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
