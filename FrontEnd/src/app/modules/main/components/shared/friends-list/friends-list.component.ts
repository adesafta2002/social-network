import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { IAppNotificationInterface } from 'src/app/models/notification.interface';
import { IUser } from 'src/app/models/user.interface';
import { selectFriendsEntities, selectFriendsLoading } from 'src/app/store/selectors/friends.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { IFriendsState } from 'src/app/store/state/friends.state';

@Component({
  selector: 'friends-list',
  templateUrl: 'friends-list.component.html',
  styleUrls: ['friends-list.component.scss']
})
export class FriendsListComponent implements OnInit, OnDestroy {
  alive = true;
  friends: IUser[];
  loading

  constructor(private store: Store<IAppState>, private router: Router) { }

  ngOnInit(): void {
    this.store.pipe(select(selectFriendsEntities)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(friends => {
        this.friends = friends
      });
  }

  userDetailsClickHandler(user: IUser) {
    this.router.navigate(['main/profile', user.id])
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
