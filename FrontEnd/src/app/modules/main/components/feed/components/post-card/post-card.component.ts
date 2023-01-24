import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { get } from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, distinctUntilChanged, take, takeWhile } from 'rxjs/operators';
import { IPost } from 'src/app/models/post.interace';
import { IUser } from 'src/app/models/user.interface';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { PostsService } from 'src/app/shared/services/posts.service';
import { selectUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'post-card',
  templateUrl: 'post-card.component.html',
  styleUrls: ['post-card.component.scss']
})
export class PostCardComponent implements OnInit, OnDestroy {
  @Input() post: IPost;
  alive = true;
  currentUser: IUser;
  buttonPressed = false;
  userLikedPost = false;

  constructor(private store: Store, private router: Router, private _postsService: PostsService, private _notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (user: IUser) => {
          if (!user) {
            return;
          }
          this.currentUser = user;
        }
      );
  }

  handlePostsError(err): Observable<any> {
    this._notificationsService.createMessage('error', 'Post', err);
    return of(null);
  }

  getFormatedDateForPost() {
    return this.post.timestamp ? moment(moment(this.post.timestamp).subtract(2, 'hours')).fromNow().toString() : '';
  }

  goToUserPage() {
    this.router.navigate(['main/profile', this.currentUser.id]);
  }

  reactToPost(reaction) {
    if (reaction === 'like') {
      this._postsService.like({ postId: this.post.id, userId: this.currentUser.id }).pipe(
        take(1)
      ).subscribe(res => {
        this.post.userLikedPost = true;
        this.post.likesCount = this.post.likesCount + 1;
      })
      return;
    }
    if (reaction === 'unlike') {
      this._postsService.unlike({ postId: this.post.id, userId: this.currentUser.id }).pipe(
        take(1)
      ).subscribe(res => {
        this.post.userLikedPost = false;
        this.post.likesCount = this.post.likesCount - 1;
      })
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
