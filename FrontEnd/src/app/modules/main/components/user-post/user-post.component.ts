import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { get } from 'lodash';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, distinctUntilChanged, take, takeWhile, withLatestFrom } from 'rxjs/operators';
import { IPost } from 'src/app/models/post.interace';
import { IUser } from 'src/app/models/user.interface';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { PostsService } from 'src/app/shared/services/posts.service';
import { selectUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'user-post',
  templateUrl: 'user-post.component.html',
  styleUrls: ['user-post.component.scss']
})
export class UserPostComponent implements OnInit, OnDestroy {
  alive = true;
  post: IPost;
  loading = false;
  userId: number;

  constructor(private route: ActivatedRoute, private store: Store, private fb: FormBuilder, private _postsService: PostsService, private _notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeWhile(() => this.alive)
    ).subscribe(params =>
      this.getPost(params.id)
    )

    this.store.pipe(select(selectUser)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged(),
        withLatestFrom(this.route.params)
      ).subscribe(
        ([user, routeParams]) => {
          if (!user) {
            return;
          }
          this.userId = user.id;
          this.getPost(routeParams.id);
        }
      );
  }

  getPost(id) {
    if (!this.userId) {
      return;
    }
    this.loading = true;
    const payload = {
      postId: id,
      observerId: this.userId
    }
    this._postsService.get(payload).pipe(
      takeWhile(() => this.alive),
      catchError(err => this.handlePostsError(err))
    ).subscribe(res => {
      if (res.entry) {
        this.post = res.entry[0];
      }
      this.loading = false;
    })
  }

  handlePostsError(err): Observable<any> {
    this._notificationsService.createMessage('error', 'Post', err);
    return of(null);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
