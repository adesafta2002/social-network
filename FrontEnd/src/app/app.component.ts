import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, filter, takeWhile } from 'rxjs/operators';
import { IAppNotificationInterface } from './models/notification.interface';
import { IUser } from './models/user.interface';
import * as userActions from './store/actions/user.actions';
import * as friendsActions from './store/actions/friends.actions';
import { selectFriendsSelected } from './store/selectors/friends.selectors';
import { selectUser, selectUserLoading, selectUserToken } from './store/selectors/user.selectors';
import { IAppState } from './store/state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  alive = true;
  loading = true;
  notification: IAppNotificationInterface[] = null;
  constructor(private translate: TranslateService, private store: Store<IAppState>) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.translate.use('en');

    this.restoreUserSession();

    this.store.pipe(select(selectUserToken)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged(),
        filter(token => !!token)
      ).subscribe(
        token => localStorage.setItem('Token', token)
      );

    this.store.pipe(select(selectUser)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (user: IUser) => {
          if (user) {
            this.store.dispatch(friendsActions.searchFriends({ payload: { userId: user.id, _summary: true } }));
          }
        }
      );

    this.store.pipe(select(selectUserLoading)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (loading: boolean) => {
          this.loading = loading;
        }
      );
  };

  restoreUserSession() {
    const localStorageUserToken = localStorage.getItem('Token');
    if (localStorageUserToken) {
      const data = {
        payload: {
          token: localStorageUserToken
        }
      };
      this.store.dispatch(userActions.restoreUserSession(data));
    }
  }
}
