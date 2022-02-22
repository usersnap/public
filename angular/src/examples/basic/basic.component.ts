import { Component } from '@angular/core';
import { UsersnapService } from 'src/services/usersnap.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  providers: [UsersnapService]
})
export class BasicComponent {
  constructor(private usersnapService: UsersnapService) {
    this.usersnapService.initialize()
  }
}
