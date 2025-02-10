import { Component } from "@angular/core";
import {
	USERSNAP_PROJECT_API_EVENT_NAME,
	USERSNAP_PROJECT_API_KEY,
} from "../../constants";
import { UsersnapService } from "../../services/usersnap.service";

/**
 * There a few ways to show your widget with custom button.
 * The first thing you need to do is to make sure in the dashboard
 * configuration of your widget in the "Display" tab you have trigger "Auto Popup".
 * Then select an "API event" as an activation and type the name of this event.
 * Then you can use this event name to show your widget.
 */
@Component({
	selector: "app-custom-button",
	templateUrl: "./customButton.component.html",
	providers: [UsersnapService],
})
export class CustomButtonComponent {
	constructor(private usersnapService: UsersnapService) {
		this.usersnapService.initialize();
	}

	/**
	 * This method takes into account other display rules,
	 * like filtering by URL path, email, logged in users and so on.
	 * It means that even you call this method but widget shouldn't
	 * open - it will not open
	 */
	handleOpenWidgetIfAllowed() {
		if (this.usersnapService.usersnapApi) {
			this.usersnapService.usersnapApi.logEvent(
				USERSNAP_PROJECT_API_EVENT_NAME,
			);
		}
	}

	/**
	 * This method ignores all the display rules and opens the widget
	 * no matter what
	 */
	handleOpenWidgetForce() {
		if (this.usersnapService.usersnapApi) {
			this.usersnapService.usersnapApi
				.show(USERSNAP_PROJECT_API_KEY)
				.then((widgetApi) => widgetApi.open());
		}
	}
}
