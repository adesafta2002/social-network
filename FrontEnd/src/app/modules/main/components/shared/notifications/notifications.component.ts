import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { ISearchResponse } from 'src/app/models/search-response.interface';
import { IUserNotification } from 'src/app/models/user-notification.interface';
import { UserNotificationsService } from 'src/app/shared/services/user-notifications.service';

@Component({
  selector: 'notifications',
  templateUrl: 'notifications.component.html',
  styleUrls: ['notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  @Input() user;
  alive = true;
  notifications: IUserNotification[];
  loading: boolean;
  constructor(private userNotificationService: UserNotificationsService, private router: Router) { }

  ngOnInit(): void {
    this.searchNotifications();
  }

  searchNotifications() {
    this.loading = true;
    this.userNotificationService.get(this.user.id).pipe(
      takeWhile(() => this.alive)
    ).subscribe((res: ISearchResponse) => {
      if (res.entry) {
        this.notifications = res.entry;
      }
      this.loading = false;
    });
  }

  navigateToUserProfile(id) {
    this.router.navigate(['main/profile', id])
  }

  viewPost(postId) {
    this.router.navigate(['main/post', postId]);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
