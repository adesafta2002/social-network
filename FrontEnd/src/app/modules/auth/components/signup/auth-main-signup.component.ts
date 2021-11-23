import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import * as userActions from '../../../../store/actions/user.actions';
import { ParticlesConfig } from '../../utils/particles-config';

declare let particlesJS: any;
@Component({
  selector: 'auth-main',
  templateUrl: 'auth-main-signup.component.html',
  styleUrls: ['auth-main-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {
  signupForm: FormGroup;

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
    this.invokeParticles();
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }

  submitFormHandler(event: any) {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
    } else {
      const data = {
        payload: this.signupForm.getRawValue()
      }
      this.store.dispatch(userActions.registerUser(data));
      this.signupForm.reset();
    }
  }
}
