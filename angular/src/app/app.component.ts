import { Component } from '@angular/core';

// import { CustomButtonComponent } from '../examples/customButton/customButton.component';
// import { CustomDisplayLogicComponent } from '../examples/customDisplayLogic/customDisplayLogic.component';
// import { NativeScreenshotComponent } from '../examples/nativeScreenshot/nativeScreenshot.component';
// import { NativeScreenshotInNewTabComponent } from '../examples/nativeScreenshotInNewTab/nativeScreenshotInNewTab.component';
// import { OnlyForLoggedInUsersComponent } from '../examples/onlyForLoggedInUsers/onlyForLoggedInUsers.component';
// import { OnlyWithCertainEmailsComponent } from '../examples/onlyWithCertainEmails/onlyWithCertainEmails.component';
// import { OtherWidgetOptionsComponent } from '../examples/otherWidgetOptions/otherWidgetOptions.component';
// import { PassHiddenValuesComponent } from '../examples/passHiddenValues/passHiddenValues.component';
// import { PassInitialValuesComponent } from '../examples/passInitialValues/passInitialValues.component';
// import { WidgetApiEventsComponent } from '../examples/widgetApiEvents/widgetApiEvents.component';
import { BasicComponent } from '../examples/basic/basic.component';


@Component({
  selector: 'app-root',
  imports: [BasicComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular19';
  currentExample = 'basic'

  setCurrentExample(example: string) {
    this.currentExample = example;
  }
}






