import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ISearchResponse } from 'src/app/models/search-response.interface';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IAppState } from 'src/app/store/state/app.state';


@Component({
  selector: 'profile-friends',
  templateUrl: 'profile-friends.component.html',
  styleUrls: ['profile-friends.component.scss']
})
export class ProfileFriendsComponent implements OnInit, OnDestroy {
  alive = true;
  id: number = null;
  selectedUser: IUser;
  loading: boolean;
  friends: IUser[];
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
  }
  ngOnInit() {
    this.route.params.pipe(
      takeWhile(() => this.alive),
    ).subscribe(params => {
      this.id = params['id'];
      this.getUser(this.id)
      this.searchFriends(this.id);
    });
  }

  getUser(id) {
    const payload = {
      id
    }
    this.userService.getSelected(payload).pipe(
      takeWhile(() => this.alive)
    ).subscribe((res: any) =>
      this.selectedUser = <IUser>res.user
    )
  }

  getDisplay() {
    return this.selectedUser ? this.selectedUser.firstName + ' ' + this.selectedUser.lastName + "'s friends" : ''
  }

  searchFriends(userId) {
    const payload = {
      userId
    }
    this.loading = true;
    this.userService.getFriends(payload).pipe(
      takeWhile(() => this.alive)
    ).subscribe(
      (friends: ISearchResponse) => {
        this.loading = false;
        this.friends = friends.entry;
        console.log(this.friends)
      }
    )
  }

  userDetailsClickHandler(user: IUser) {
    this.router.navigate(['main/profile', user.id])
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
