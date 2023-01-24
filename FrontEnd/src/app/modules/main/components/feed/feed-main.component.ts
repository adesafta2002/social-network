import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { get } from 'lodash';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, distinctUntilChanged, take, takeWhile } from 'rxjs/operators';
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


  get userId(): FormControl {
    return this.postForm.get('userId') as FormControl
  }
  get content(): FormControl {
    return this.postForm.get('content') as FormControl
  }
  constructor(private store: Store, private fb: FormBuilder, private postsService: PostsService, private _notificationsService: NotificationsService) {
    this.postForm = this.fb.group({
      userId: [null, [Validators.required]],
      content: [null, [Validators.required, Validators.maxLength(500)]]
    })
  }

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
          this.userId.patchValue(user.id);
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
    this.postsService.post(post).pipe(
      take(1),
      catchError(err => this.handlePostsError(err))
    ).subscribe(res => {
      this._notificationsService.createMessage('success', 'Post', 'New post added');
      this.content.reset();
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
