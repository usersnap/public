import { Component } from "@angular/core";
import { UsersnapService } from "../../services/usersnap.service";

@Component({
	selector: "app-native-screenshot-in-new-tab",
	templateUrl: "./nativeScreenshotInNewTab.component.html",
	providers: [UsersnapService],
})
export class NativeScreenshotInNewTabComponent {
	constructor(private usersnapService: UsersnapService) {
		/**
		 * "nativeScreenshot" should be an object "{ target: '_blank' }"
		 */
		this.usersnapService.initialize({ nativeScreenshot: { target: "_blank" } });
	}
}
