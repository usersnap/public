import { Component, Input } from "@angular/core";
import { USERSNAP_PROJECT_API_KEY } from "../../constants";
import { UsersnapService } from "../../services/usersnap.service";

@Component({
	selector: "app-custom-display-logic",
	templateUrl: "./customDisplayLogic.component.html",
	providers: [UsersnapService],
})
export class CustomDisplayLogicComponent {
	@Input() shouldShow = true;

	constructor(private usersnapService: UsersnapService) {}

	/**
	 * In order to have custom logic to show your widget you need to make sure that
	 * in the dashboard configuration of your widget in the "Display" tab you have
	 * audience "Nobody". Then you open your feedback button or widget whenever you need.
	 */
	ngOnInit() {
		this.usersnapService.initialize().then((usersnapApi) => {
			if (this.shouldShow) {
				usersnapApi.show(USERSNAP_PROJECT_API_KEY);
			}
		});
	}
}
