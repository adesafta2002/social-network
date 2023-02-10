import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, takeWhile } from 'rxjs/operators';
import { selectUserLoading } from 'src/app/store/selectors/user.selectors';
import { IAppState } from 'src/app/store/state/app.state';
import * as userActions from '../../../../store/actions/user.actions';
import { ParticlesConfig } from '../../utils/particles-config';

declare let particlesJS: any;
@Component({
  selector: 'auth-main',
  templateUrl: 'auth-main-signup.component.html',
  styleUrls: ['auth-main-signup.component.scss']
})
export class AuthSignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  alive = true;
  loading = false;
  passwordsMatchValidation = true;

  get firstName(): FormControl {
    return this.signupForm.get('firstName') as FormControl
  }
  get lastName(): FormControl {
    return this.signupForm.get('lastName') as FormControl
  }
  get email(): FormControl {
    return this.signupForm.get('email') as FormControl
  }
  get password(): FormControl {
    return this.signupForm.get('password') as FormControl
  }
  get passwordConfirm(): FormControl {
    return this.signupForm.get('passwordConfirm') as FormControl
  }

  constructor(private fb: FormBuilder, private store: Store<IAppState>) {
    this.signupForm = this.fb.group(
      {
        firstName: [null, [Validators.required, Validators.maxLength(50)]],
        lastName: [null, [Validators.required, Validators.maxLength(50)]],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        passwordConfirm: [null, [Validators.required, Validators.minLength(8)]]
      }
    )
  }
  ngOnInit() {
    // this.invokeParticles();

    this.store.pipe(select(selectUserLoading)).pipe(
      takeWhile(() => this.alive),
      distinctUntilChanged()
    ).subscribe(loading => this.loading = loading);

  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }

  submitFormHandler(event: any) {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
    } else {
      if (this.password.value === this.passwordConfirm.value) {
        this.passwordsMatchValidation = true;
        const data = {
          payload: this.signupForm.getRawValue()
        }
        this.store.dispatch(userActions.registerUser(data));
        this.signupForm.reset();
      } else {
        this.passwordsMatchValidation = false;
      }
    }
  }

  ngOnDestroy() {
    this.alive = false
  }
}
