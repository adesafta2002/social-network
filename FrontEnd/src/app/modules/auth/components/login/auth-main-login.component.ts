import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, Validators.required]
      }
    )
  }
  ngOnInit() {
    this.invokeParticles();
  }

  submitFormHandler(event: any) {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();

    }
  }

  public invokeParticles(): void {
    particlesJS('particles-js', ParticlesConfig, function () { });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

