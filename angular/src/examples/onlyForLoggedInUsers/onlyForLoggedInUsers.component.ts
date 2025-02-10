import { Component } from "@angular/core";
import { UsersnapService } from "../../services/usersnap.service";

@Component({
	selector: "app-only-for-logged-in-users",
	templateUrl: "./onlyForLoggedInUsers.component.html",
	providers: [UsersnapService],
})
export class OnlyForLoggedInUsersComponent {
	constructor(private usersnapService: UsersnapService) {
		/**
		 * "userId" should be non-falsy value in order for the widget
		 * to consider the current user as logged in one
		 */
		this.usersnapService.initialize({ user: { userId: "123" } });
	}
}
