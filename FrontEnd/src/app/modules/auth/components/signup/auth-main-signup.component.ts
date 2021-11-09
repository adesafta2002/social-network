import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { registerUser } from 'src/app/store/actions/user.actions';
import { selectUserToken } from 'src/app/store/selectors/user.selectors';
import { IAppState } from 'src/app/store/state/app.state';
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
        firstName: [null, [Validators.required,Validators.maxLength(50)]],
        lastName: [null, [Validators.required,Validators.maxLength(50)]],
        email: [null, [Validators.required, Validators.email,Validators.maxLength(100)]],
        password: [null, Validators.required],
        passwordConfirm: [null, Validators.required]
      }
    )
  }
  ngOnInit() {
    this.invokeParticles();
    this.store.pipe(select(selectUserToken)).subscribe(
      token => console.log(token)
    )
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }

  submitFormHandler(event: any) {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
      this.store.dispatch(registerUser(this.signupForm.getRawValue()))
    }
  }
}
