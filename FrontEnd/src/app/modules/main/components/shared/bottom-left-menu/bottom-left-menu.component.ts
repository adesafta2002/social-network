import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { get } from 'lodash';
import { map, takeWhile } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'bottom-left-menu',
  templateUrl: 'bottom-left-menu.component.html',
  styleUrls: ['bottom-left-menu.component.scss']
})
export class BottomLeftMenuComponent implements OnInit, OnDestroy {
  @Input() user: IUser;
  alive = true;
  constructor(private router: Router, private route: ActivatedRoute) {
    const url = route.url.pipe(map(segments => segments.join('')));
  }

  ngOnInit(): void {
  }

  userDetailsClickHandler() {
    this.router.navigate(['main/profile', this.user.id])
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
