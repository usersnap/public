import { Component } from '@angular/core';
import { UsersnapService } from 'src/services/usersnap.service';

@Component({
  selector: 'app-other-widget-options',
  templateUrl: './otherWidgetOptions.component.html',
  providers: [UsersnapService]
})
export class OtherWidgetOptionsComponent {
  constructor(private usersnapService: UsersnapService) {
    this.usersnapService.initialize({
      collectGeoLocation: 'none', // whether to collect geo location when submitting feedback, other values are "null" and "'all"
      enableScreenshot: false, // whether to enable widget screenshot
      useLocalStorage: false, // whether allowed to use user's local storage
      useSystemFonts: true, // whether widget should use browser default font rather than loading external one
      locale: 'de' // force widget language
    })
  }
}
