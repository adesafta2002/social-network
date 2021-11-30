import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { IUser } from 'src/app/models/user.interface';
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent {
  alive = true
  user: IUser = null;
  constructor(private store: Store<IAppState>, private router: Router) { }

  ngOnInit() {
    this.store.pipe(select(selectUser)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (user: IUser) => {
          this.user = user
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
