import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { selectUserLoading } from 'src/app/store/selectors/user.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import * as userActions from '../../../../store/actions/user.actions';
import { ParticlesConfig } from '../../utils/particles-config';

declare let particlesJS: any;

@Component({
  selector: 'auth-main',
  templateUrl: 'auth-main-login.component.html',
  styleUrls: ['auth-main-login.component.scss']
})
export class AuthLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  alive = true;
  loading = false;

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl
  }

  constructor(private fb: FormBuilder, private store: Store<IAppState>, private router: Router) {
    this.loginForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
        password: [null, [Validators.required, Validators.minLength(8)]]
      }
    )
  }
  ngOnInit() {
    // this.invokeParticles();
    this.store.pipe(select(selectUserLoading)).pipe(
      takeWhile(() => this.alive),
      distinctUntilChanged()
    ).subscribe(loading => this.loading = loading)
  }

  submitFormHandler(event: any) {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      const data = {
        payload: this.loginForm.getRawValue()
      }
      this.store.dispatch(userActions.loginUser(data));
    }
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

