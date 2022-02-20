import { Component, Input } from '@angular/core';
import { UsersnapService } from 'src/services/usersnap.service';

@Component({
  selector: 'app-native-screenshot',
  templateUrl: './nativeScreenshot.component.html',
  providers: [UsersnapService]
})
export class NativeScreenshotComponent {
  @Input() shouldShow = true;

  constructor(private usersnapService: UsersnapService) {
    /**
     * "nativeScreenshot" should be "true" value or "{ target: '_self' }"
     */
    this.usersnapService.initialize({ nativeScreenshot: true })
  }
}
