import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { find, findIndex } from 'lodash';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeWhile } from 'rxjs/operators';
import { IRelationship } from 'src/app/models/relationship.interface';
import { ISearchResponse } from 'src/app/models/search-response.interface';
import { IUser } from 'src/app/models/user.interface';
import { logOutUser } from 'src/app/store/actions/user.actions';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import { UserParams, UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'app-navbar.component.html',
  styleUrls: ['app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit, OnDestroy {
  alive = true
  user: IUser = null;
  showMore = false;
  _searchValue: string = '';
  searchForm: FormGroup;
  showSearchBox = false;
  users: IUser[];
  public userSearch$ = new Subject<UserParams>();

  set searchValue(value: any) {
    this._searchValue = value;
    this.searchUsers(value);
  }

  constructor(private store: Store<IAppState>, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.store.pipe(select(selectUser)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (user: IUser) => {
          if (!user) {
            this.showMore = false;
          } else {
            this.searchUsers();
          }
          this.user = user
        }
      );

    this.userSearch$.pipe(
      debounceTime(100),
      takeWhile(() => this.alive),
      switchMap((payload) => this.userService.getUsers(payload))
    ).subscribe((res: ISearchResponse) => {
      if (res.entry) {
        this.users = res.entry.filter((user: IUser) => user.id !== this.user.id)
      }
    })
  }

  searchUsers(name: string = '') {
    const payload = {
      _summary: true,
      name
    }
    this.userSearch$.next(payload);
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
    this.showSearchBox = false;
  }

  setShowBox(event: any) {
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
