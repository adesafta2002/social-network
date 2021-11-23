import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { takeWhile, distinctUntilChanged, filter } from 'rxjs/operators';
import { selectUserToken } from './store/selectors/user.selectors';
import { IAppState } from './store/state/app.state';
import * as userActions from './store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  alive = true;
  constructor(private translate: TranslateService, private store: Store<IAppState>) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.translate.use('en');

    // this.restoreUserSession();
    
    this.store.pipe(select(selectUserToken)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged(),
        filter(token => !!token)
      ).subscribe(
        token => localStorage.setItem('Token', token)
      );
  };

  // restoreUserSession() {
  //   const localStorageUserToken = localStorage.getItem('Token');
  //   if (localStorageUserToken) {
  //     const data = {
  //       payload: {
  //         token: localStorageUserToken
  //       }
  //     };
  //     this.store.dispatch(userActions.restoreUserSession(data));
  //   }
  // }
}
