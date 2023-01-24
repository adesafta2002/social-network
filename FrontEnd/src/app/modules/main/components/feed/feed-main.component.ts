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
  selector: 'feed-main',
  templateUrl: 'feed-main.component.html',
  styleUrls: ['feed-main.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy {
  alive = true;
  postForm: FormGroup
  buttonPressed = false;
  postsUserId: number = null;
  posts: IPost[];
  loading = false;

  get userId(): FormControl {
    return this.postForm.get('userId') as FormControl
  }
  get content(): FormControl {
    return this.postForm.get('content') as FormControl
  }
  constructor(private route: ActivatedRoute, private store: Store, private fb: FormBuilder, private _postsService: PostsService, private _notificationsService: NotificationsService) {
    this.postForm = this.fb.group({
      userId: [null, [Validators.required]],
      content: [null, [Validators.required, Validators.maxLength(500)]]
    })
  }

  ngOnInit(): void {
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
          this.userId.patchValue(user.id);
          this.postsUserId = +routeParams.userId;
          this.getPosts();
        }
      );
  }

  savePost() {
    if (!this.postForm.valid) {
      this.buttonPressed = true;
      return;
    }
    this.buttonPressed = false;
    const post = this.postForm.getRawValue();
    this._postsService.post(post).pipe(
      take(1),
      catchError(err => this.handlePostsError(err))
    ).subscribe(res => {
      this._notificationsService.createMessage('success', 'Post', 'New post added');
      this.content.reset();
      this.getPosts();
    })
  }

  getPosts() {
    this.loading = true;
    const payload = {
      userId: this.postsUserId,
      observerId: this.userId.value
    }
    this._postsService.get(payload).pipe(
      takeWhile(() => this.alive),
      catchError(err => this.handlePostsError(err))
    ).subscribe(res => {
      if (res.entry) {
        this.posts = res.entry;
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
