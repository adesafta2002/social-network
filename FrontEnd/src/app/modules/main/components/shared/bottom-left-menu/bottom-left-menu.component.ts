import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'bottom-left-menu',
  templateUrl: 'bottom-left-menu.component.html',
  styleUrls: ['bottom-left-menu.component.scss']
})
export class BottomLeftMenuComponent {
  @Input() user: IUser;
  constructor(private router: Router) {
  }
  userDetailsClickHandler() {
    this.router.navigate(['main/profile', this.user.id])
  }
}
