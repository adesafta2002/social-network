import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { find, findIndex } from 'lodash';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { distinctUntilChanged, filter, takeWhile, take } from 'rxjs/operators';
import { FriendRequestTypes } from 'src/app/enums/friend-request-types';
import { IMessage } from 'src/app/models/message.interface';
import { IRelationship } from 'src/app/models/relationship.interface';
import { ISearchResponse } from 'src/app/models/search-response.interface';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { UserService } from 'src/app/shared/services/user.service';
import { selectFriendsLoading, selectFriendsSelected } from 'src/app/store/selectors/friends.selectors';
import { selectUser } from 'src/app/store/selectors/user.selectors';
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
  loggedUser: IUser = null;
  relationships: IRelationship[];
  loading: boolean;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private store: Store<IAppState>, private userService: UserService, private notificationsService: NotificationsService) {

  }
  ngOnInit() {
    this.store.pipe(select(selectUser)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (user: IUser) => {
          if (!user) {
            return;
          }
          this.loggedUser = user;
          this.getRelationships(user.id);
        }
      );

    this.route.params.pipe(
      takeWhile(() => this.alive),
    ).subscribe(params => {
      this.id = params['id'];
      const payload = {
        id: this.id
      }
      this.store.dispatch(friendsActions.getSelectedUser({ payload }));
      this.getRelationships(this.loggedUser.id);
    });

    this.store.pipe(select(selectFriendsSelected)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged(),
        filter(user => !!user)
      ).subscribe(
        selectedUser => {
          this.selectedUser = selectedUser;
          this.mapSelectedUser();
        });

    this.store.pipe(select(selectFriendsLoading)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (loading: boolean) => {
          this.loading = loading;
        }
      );
  }


  getRelationships(userId: number) {
    this.userService.getRelationships({ userId }).pipe(
      takeWhile(() => this.alive)
    ).subscribe(
      (res: ISearchResponse) => {
        if (res.entry) {
          this.relationships = res.entry;
        }
      }
    )
  }

  mapSelectedUser() {
    let friendRequest = '';
    let relationshipId = null;
    const requestSent = findIndex(this.relationships, (rel) => {
      return rel.emit_user == this.loggedUser.id && rel.receive_user == this.selectedUser.id;
    });
    const receivedFriendRequest = findIndex(this.relationships, (rel) => {
      return rel.receive_user == this.loggedUser.id && rel.emit_user == this.selectedUser.id;
    });
    if (requestSent !== -1) {
      friendRequest = this.relationships[requestSent].pending == 1 ? FriendRequestTypes.sent : FriendRequestTypes.friends;
      relationshipId = this.relationships[requestSent].id;
    }
    if (receivedFriendRequest !== -1) {
      friendRequest = this.relationships[receivedFriendRequest].pending == 1 ? FriendRequestTypes.received : FriendRequestTypes.friends;
      relationshipId = this.relationships[receivedFriendRequest].id;

    }
    const birthDate = this.selectedUser.birthDate ? moment(this.selectedUser.birthDate).format('YYYY-MM-DD').toString() : '';
    const gender = this.mapUserGender(this.selectedUser.gender);
    this.selectedUser = {
      ...this.selectedUser,
      friendRequest,
      birthDate,
      gender,
      relationshipId
    }
  }

  mapUserGender(gender: number | string) {
    switch (+gender) {
      case 1:
        return 'Male'
      case 2:
        return 'Female'
      case 3:
        return 'Other'
    }
    return '';
  }

  sendFriendRequest() {
    const relationship: IRelationship = {
      emit_user: this.loggedUser.id,
      receive_user: this.selectedUser.id
    }
    this.userService.sendFriendRequest(relationship).pipe(
      take(1)
    ).subscribe(res => {
      if (res.body) {
        this.notificationsService.createMessage('error', 'Error', res.body);
      } else {
        this.notificationsService.createMessage('success', 'Success', 'Friend request sent.');
        const location = +res.headers.get('Location');
        this.selectedUser = {
          ...this.selectedUser,
          friendRequest: 'sent',
          relationshipId: location
        };
        this.getRelationships(this.loggedUser.id);
      }
    })
  }

  cancelFriendRequest(message: string) {
    this.userService.cancelFriendRequest(this.selectedUser.relationshipId).pipe(
      take(1)
    ).subscribe(res => {
      if (res) {
        this.notificationsService.createMessage('error', 'Error', res);
      } else {
        this.store.dispatch(friendsActions.searchFriends({ payload: { userId: this.loggedUser.id, _summary: true } }));
        this.notificationsService.createMessage('success', 'Success', message);
        this.selectedUser = {
          ...this.selectedUser,
          friendRequest: '',
          relationshipId: null
        }
        this.getRelationships(this.loggedUser.id);
      }
    })
  }

  acceptFriendRequest() {
    this.userService.acceptFriendRequest(this.selectedUser.relationshipId).pipe(
      take(1)
    ).subscribe(res => {
      if (res) {
        this.notificationsService.createMessage('error', 'Error', res);
      } else {
        this.notificationsService.createMessage('success', 'Success', 'Friend request accepted.');
        this.selectedUser = {
          ...this.selectedUser,
          friendRequest: 'friends',
        }
        this.getRelationships(this.loggedUser.id);
        this.store.dispatch(friendsActions.searchFriends({ payload: { userId: this.loggedUser.id, _summary: true } }))
      }
    })
  }

  seeUserPosts() {
    this.router.navigate(['main/user-feed', this.selectedUser.id]);
  }

  seeUserFriends() {
    this.router.navigate(['main/friends', this.selectedUser.id]);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
