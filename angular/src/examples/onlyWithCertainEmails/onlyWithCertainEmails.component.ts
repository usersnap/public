import { Component } from "@angular/core";
import { UsersnapService } from "../../services/usersnap.service";

@Component({
	selector: "app-only-with-certain-emails",
	templateUrl: "./onlyWithCertainEmails.component.html",
	providers: [UsersnapService],
})
export class OnlyWithCertainEmailsComponent {
	constructor(private usersnapService: UsersnapService) {
		/**
		 * "email" should be a string which will be compared
		 * to the list of allowed or not-allowed emails
		 */
		this.usersnapService.initialize({ user: { email: "user@mail.com" } });
	}
}
