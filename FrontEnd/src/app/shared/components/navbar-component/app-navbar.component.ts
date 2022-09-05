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
  searchValue: string;
  showSearchBox = false;
  users: IUser[] = [<IUser>{
    id: 1,
    firstName: 'Safta',
    lastName: 'Adelin'
  }, <IUser>{
    id: 2,
    firstName: 'Dragulin',
    lastName: 'Andrei'
  }, <IUser>{
    id: 3,
    firstName: 'Popescu',
    lastName: 'Gabriela'
  },
  <IUser>{
    id: 1,
    firstName: 'Safta',
    lastName: 'Adelin'
  }, <IUser>{
    id: 1,
    firstName: 'Dragulin',
    lastName: 'Andrei'
  }, <IUser>{
    id: 1,
    firstName: 'Popescu',
    lastName: 'Gabriela'
  },
  <IUser>{
    id: 1,
    firstName: 'Safta',
    lastName: 'Adelin'
  }, <IUser>{
    id: 1,
    firstName: 'Dragulin',
    lastName: 'Andrei'
  }, <IUser>{
    id: 1,
    firstName: 'Popescu',
    lastName: 'Gabriela'
  }]
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
    this.router.navigate(['/main/profile', this.user.id])
  }

  showMoreInfo() {
    this.showMore = !this.showMore;
  }

  logOutUser() {
    localStorage.setItem('Token', '');
    this.store.dispatch(logOutUser());
    this.router.navigate(['/auth/login'])
  }

  handleProfileSelect(selected: boolean) {
    console.log(selected)
    this.showSearchBox = false;
  }

  setShowBox(event: any) {
    console.log(event)
    switch (event.type) {
      case 'focus':
        this.showSearchBox = true;
        break;
      default:
        setTimeout(() => {
          this.showSearchBox = false;
        }, 200)
        break;
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
