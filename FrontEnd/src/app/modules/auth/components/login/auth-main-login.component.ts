import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';
import { ParticlesConfig } from '../../utils/particles-config';
import * as userActions from '../../../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Router } from '@angular/router';

declare let particlesJS: any;

@Component({
  selector: 'auth-main',
  templateUrl: 'auth-main-login.component.html',
  styleUrls: ['auth-main-login.component.scss']
})
export class AuthLoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  alive = true;

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
    this.invokeParticles();
  }

  submitFormHandler(event: any) {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    } else {
      const data = {
        payload: this.loginForm.getRawValue()
      }
      this.store.dispatch(userActions.loginUser(data));
      this.router.navigate(['/home']);
    }
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

