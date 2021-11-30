import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, filter, takeWhile } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.interface';
import { logOutUser } from 'src/app/store/actions/user.actions';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: 'app-navbar.component.html',
  styleUrls: ['app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit, OnDestroy {
  alive = true
  user: IUser = null;
  showMore = false;
  constructor(private store: Store<IAppState>, private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(selectUser)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (user: IUser) => {
          if (!user) {
            this.showMore = false;
          }
          this.user = user
        }
      );
  }

  userClickHandler() {
    this.router.navigate(['/main/profile',this.user.id])
  }

  showMoreInfo() {
    this.showMore = !this.showMore;
  }

  logOutUser() {
    localStorage.setItem('Token', '');
    this.store.dispatch(logOutUser());
    this.router.navigate(['/auth/login'])
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
