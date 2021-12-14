import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, filter, takeWhile } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { selectFriendsSelected } from 'src/app/store/selectors/friends.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import * as friendsActions from '../../../../store/actions/friends.actions';

@Component({
  selector: 'profile-main',
  templateUrl: 'profile-main.component.html',
  styleUrls: ['profile-main.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  alive = true;
  id: number = null;
  selectedUser: IUser = null;
  constructor(private route: ActivatedRoute, private authService: AuthService, private store: Store<IAppState>) {

  }
  ngOnInit() {
    this.route.params.pipe(
      takeWhile(() => this.alive),
    ).subscribe(params => {
      this.id = params['id'];
      const payload = {
        id: this.id
      }
      this.store.dispatch(friendsActions.getSelectedUser({ payload }));
    }
    )

    this.store.pipe(select(selectFriendsSelected)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged(),
        filter(user => !!user)
      ).subscribe(
        selectedUser => {
          console.log(selectedUser, 'selected')
          this.selectedUser = selectedUser
        }
      );

  }
  ngOnDestroy() {
    this.alive = false;
  }
}
