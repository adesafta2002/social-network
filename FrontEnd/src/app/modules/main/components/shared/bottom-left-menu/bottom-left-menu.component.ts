import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'bottom-left-menu',
  templateUrl: 'bottom-left-menu.component.html',
  styleUrls: ['bottom-left-menu.component.scss']
})
export class BottomLeftMenuComponent {
  @Input() user: IUser;
  constructor(private router: Router, route: ActivatedRoute) {
    const url = route.url.pipe(map(segments => segments.join('')));
  }
  userDetailsClickHandler() {
    this.router.navigate(['main/profile', this.user.id])
  }
}
