import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { USERSNAP_PROJECT_API_KEY } from 'src/constants';
import { UsersnapService } from 'src/services/usersnap.service';

@Component({
  selector: 'app-custom-display-logic',
  templateUrl: './customDisplayLogic.component.html',
  providers: [UsersnapService]
})
export class CustomDisplayLogicComponent {
  @Input() shouldShow = true;

  private subscription: Subscription | null = null
  constructor(private usersnapService: UsersnapService) {
    this.usersnapService.initialize()
  }

  /**
   * In order to have custom logic to show your widget you need to make sure that
   * in the dashboard configuration of your widget in the "Display" tab you have
   * audience "Nobody". Then you open your feedback button or widget whenever you need.
   */
  ngOnInit() {
    this.subscription = this.usersnapService.usersnapApi.subscribe(usersnapApi => {
      if (usersnapApi && this.shouldShow) {
        usersnapApi.show(USERSNAP_PROJECT_API_KEY);
        this.subscription?.unsubscribe();
      }
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
