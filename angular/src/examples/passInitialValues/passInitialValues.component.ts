import { Component, Input } from '@angular/core';
import { UsersnapService } from 'src/services/usersnap.service';

@Component({
  selector: 'app-pass-initial-values',
  templateUrl: './passInitialValues.component.html',
  providers: [UsersnapService]
})
export class PassInitialValuesComponent {
  @Input() labels = ['Bug'];
  @Input() email = 'user@mail.com';
  @Input() assignee = 'assignee@mail.com';
  @Input() rating = 5;

  constructor(private usersnapService: UsersnapService) {}

  /**
   * You can define initial values for a few fields in your widget.
   * Important that those fields must exist in your widget.
   * Please note that "rating" field is available only for
   * NPS, CSAT and Customer Engagement
   */
  ngOnInit() {
    this.usersnapService.initialize().then(usersnapApi => {
      usersnapApi.on('open', this.handleOpenWidget);
    })
  }

  ngOnDestroy() {
    if (this.usersnapService.usersnapApi) {
      this.usersnapService.usersnapApi.off('open', this.handleOpenWidget);
    }
  }

  private handleOpenWidget = (event: any) => {
    event.api.setValue('labels', this.labels);
    event.api.setValue('visitor', this.email);
    event.api.setValue('assignee', this.assignee);
    event.api.setValue('rating', this.rating);
  }
}
