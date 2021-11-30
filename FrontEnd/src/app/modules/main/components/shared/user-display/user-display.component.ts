import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'user-display',
  templateUrl: 'user-display.component.html',
  styleUrls: ['user-display.component.scss']
})
export class UserDisplayComponent {
  @Input() user: IUser;
  constructor(private router: Router) {
  }
  userDetailsClickHandler() {
    this.router.navigate(['main/profile', this.user.id])
  }
}
