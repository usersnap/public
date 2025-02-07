import { Component } from '@angular/core';
import { UsersnapService } from '../../services/usersnap.service';
import type { SpaceBeforeSubmitEventCallback, SpaceCloseEventCallback, SpaceClosingEventCallback, SpaceOpenEventCallback, SpaceSubmitEventCallback } from '@usersnap/browser';

@Component({
  selector: 'app-widget-api-events',
  templateUrl: './widgetApiEvents.component.html',
  providers: [UsersnapService]
})
export class WidgetApiEventsComponent {
  constructor(private usersnapService: UsersnapService) { }

  /**
   * You can define initial values for a few fields in your widget.
   * Important that those fields must exist in your widget.
   * Please note that "rating" field is available only for
   * NPS, CSAT and Customer Engagement
   */
  ngOnInit() {
    this.usersnapService.initialize().then((usersnapApi) => {
      usersnapApi.on('open', this.handleWidgetOpen);
      usersnapApi.on('beforeSubmit', this.handleWidgetBeforeSubmit);
      usersnapApi.on('submit', this.handleWidgetSubmit);
      usersnapApi.on('closing', this.handleWidgetClosing);
      usersnapApi.on('close', this.handleWidgetClose);
    })
  }

  handleWidgetOpen: SpaceOpenEventCallback = (event) => {
    // here the widget starts opening
  }

  handleWidgetBeforeSubmit: SpaceBeforeSubmitEventCallback = (event) => {
    // here the widget feedback item is about to be submitted
  }


  handleWidgetSubmit: SpaceSubmitEventCallback = (event) => {
    // here the widget feedback item was submitted
  }


  handleWidgetClosing: SpaceClosingEventCallback = (event) => {
    // here the widget starts closing
  }

  // SpaceCloseEventCallback
  handleWidgetClose: SpaceCloseEventCallback = (
    event,
  ) => {
    console.log('Widget closed', event);
  }



  ngOnDestroy() {
    if (this.usersnapService.usersnapApi) {
      this.usersnapService.usersnapApi.off('open', this.handleWidgetOpen);
      this.usersnapService.usersnapApi.off('beforeSubmit', this.handleWidgetBeforeSubmit);
      this.usersnapService.usersnapApi.off('submit', this.handleWidgetSubmit);
      this.usersnapService.usersnapApi.off('closing', this.handleWidgetClosing);
      this.usersnapService.usersnapApi.off('close', this.handleWidgetClose);
    }
  }
}
