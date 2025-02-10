import { Component } from "@angular/core";

import { BasicComponent } from "../examples/basic/basic.component";

@Component({
	selector: "app-root",
	imports: [BasicComponent],
	templateUrl: "./app.component.html",
})
export class AppComponent {
	title = "angular19";
	currentExample = "basic";

	setCurrentExample(example: string) {
		this.currentExample = example;
	}
}
