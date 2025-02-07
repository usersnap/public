import { Component, Input } from '@angular/core';
import { UsersnapService } from '../../services/usersnap.service';
import type { SpaceOpenEventCallback } from '@usersnap/browser';

@Component({
  selector: 'app-pass-hidden-values',
  templateUrl: './passHiddenValues.component.html',
  providers: [UsersnapService]
})
export class PassHiddenValuesComponent {
  @Input() labels = ['Bug', 'Urgent'];
  @Input() email = 'user@mail.com';
  @Input() assignee = 'assignee@mail.com';
  @Input() custom: any = {
    importantData: 'From Super user'
  };

  constructor(private usersnapService: UsersnapService) { }

  /**
   * You can define initial values for a few fields in your widget.
   * Important that those fields must exist in your widget.
   * Please note that "rating" field is available only for
   * NPS, CSAT and Customer Engagement
   */
  ngOnInit() {
    this.usersnapService.initialize().then((usersnapApi) => {
      usersnapApi.on('open', this.handleOpenWidget);
    })
  }

  ngOnDestroy() {
    if (this.usersnapService.usersnapApi) {
      this.usersnapService.usersnapApi.off('open', this.handleOpenWidget);
    }
  }

  private handleOpenWidget: SpaceOpenEventCallback = (event) => {
    event.api.setValue('labels', this.labels);
    event.api.setValue('visitor', this.email);
    event.api.setValue('assignee', this.assignee);
    event.api.setValue('custom', this.custom);
  }
}
