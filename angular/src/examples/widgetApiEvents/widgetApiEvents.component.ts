import { Component } from '@angular/core';
import { UsersnapService } from 'src/services/usersnap.service';

@Component({
  selector: 'app-widget-api-events',
  templateUrl: './widgetApiEvents.component.html',
  providers: [UsersnapService]
})
export class WidgetApiEventsComponent {
  constructor(private usersnapService: UsersnapService) {}

  /**
   * You can define initial values for a few fields in your widget.
   * Important that those fields must exist in your widget.
   * Please note that "rating" field is available only for
   * NPS, CSAT and Customer Engagement
   */
  ngOnInit() {
    this.usersnapService.initialize().then((usersnapApi) => {
      usersnapApi.on('load', this.handleWidgetLoad);
      usersnapApi.on('open', this.handleWidgetOpen);
      usersnapApi.on('beforeSubmit', this.handleWidgetBeforeSubmit);
      usersnapApi.on('submit', this.handleWidgetSubmit);
      usersnapApi.on('closing', this.handleWidgetClosing);
      usersnapApi.on('close', this.handleWidgetClose);
      usersnapApi.on('destroy', this.handleWidgetDestroy);
    })
  }

  /**
   * @param event 
   * @param event.type Type of the event, in this case "load"
   * @param event.apiKey Project API key of the widget for which the event was triggerred
   */
  handleWidgetLoad(event: any) {
    // here the widget or feedback button is loaded
  }

  /**
   * @param event 
   * @param event.type Type of the event, in this case "open"
   * @param event.apiKey Project API key of the widget for which the event was triggerred
   * @param event.api.setValue Function to set the initial values of widget fields
   */
  handleWidgetOpen(event: any) {
    // here the widget starts opening
  }

  /**
   * @param event 
   * @param event.type Type of the event, in this case "open"
   * @param event.apiKey Project API key of the widget for which the event was triggerred
   * @param event.values Key-value pairs object with feedback item values
   * @param event.api.setValue Function to set the feedback item values before they are being submitted.
   * The allowed values for changing are labels, custom, visitor, assignee
   */
  handleWidgetBeforeSubmit(event: any) {
    // here the widget feedback item is about to be submitted
  }

  /**
   * @param event 
   * @param event.type Type of the event, in this case "open"
   * @param event.apiKey Project API key of the widget for which the event was triggerred
   * @param event.values Key-value pairs object with feedback item values
   */
  handleWidgetSubmit(event: any) {
    // here the widget feedback item was submitted
  }

  /**
   * @param event 
   * @param event.type Type of the event, in this case "closing"
   * @param event.apiKey Project API key of the widget for which the event was triggerred
   * @param event.isCancel Boolean value which has value "true" if widget was closed without feedback being submitted
   */
  handleWidgetClosing(event: any) {
    // here the widget starts closing
  }

  /**
   * @param event 
   * @param event.type Type of the event, in this case "closing"
   * @param event.apiKey Project API key of the widget for which the event was triggerred
   * @param event.isCancel Boolean value which has value "true" if widget was closed without feedback being submitted
   */
  handleWidgetClose(event: any) {
    // here the widget is closed
  }

  /**
   * @param event 
   * @param event.type Type of the event, in this case "destroy"
   * @param event.apiKey Project API key of the widget for which the event was triggerred
   */
  handleWidgetDestroy(event: any) {
    // here the widget is destroyed and removed from DOM
  }

  ngOnDestroy() {
    if (this.usersnapService.usersnapApi) {
      this.usersnapService.usersnapApi.off('load', this.handleWidgetLoad);
      this.usersnapService.usersnapApi.off('open', this.handleWidgetOpen);
      this.usersnapService.usersnapApi.off('beforeSubmit', this.handleWidgetBeforeSubmit);
      this.usersnapService.usersnapApi.off('submit', this.handleWidgetSubmit);
      this.usersnapService.usersnapApi.off('closing', this.handleWidgetClosing);
      this.usersnapService.usersnapApi.off('close', this.handleWidgetClosing);
      this.usersnapService.usersnapApi.off('destroy', this.handleWidgetDestroy);
    }
  }
}
