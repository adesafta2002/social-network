import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile, distinctUntilChanged, filter } from 'rxjs/operators';
import { selectUserLoading, selectUserToken } from './store/selectors/user.selectors';
import { IAppState } from './store/state/app.state';
import * as userActions from './store/actions/user.actions';
import { NotificationService } from './shared/services/notification.service';
import { IAppNotificationInterface } from './models/notification.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  alive = true;
  loading = true;
  notification: IAppNotificationInterface = null;
  constructor(private translate: TranslateService, private store: Store<IAppState>, private notificationService: NotificationService) {
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

    setTimeout(() => {
      this.loading = false;
    }, 0);

    this.notificationService.notifications.pipe(
      takeWhile(() => this.alive)
    ).subscribe(
      notification => {
        this.notification = notification;
        setTimeout(
          () => this.notification = {type: 'none', message: ''},
          2000);
      }

    )
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
