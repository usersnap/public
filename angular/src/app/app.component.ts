import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  currentExample = 'basic'

  setCurrentExample(example: string) {
    this.currentExample = example;
  }
}
