import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.interface';
import * as moment from 'moment';

@Component({
  selector: 'settings-main',
  templateUrl: 'settings-main.component.html',
  styleUrls: ['settings-main.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  @Input() user: IUser;
  settingsForm: FormGroup;
  alive = true;
  date;
  genderOptions = [{ name: 'Male', value: 1 },
  { name: 'Female', value: 2 },
  { name: 'Other', value: 3 }]

  get firstName(): FormControl {
    return this.settingsForm.get('firstName') as FormControl;
  }
  get lastName(): FormControl {
    return this.settingsForm.get('lastName') as FormControl;
  }
  get email(): FormControl {
    return this.settingsForm.get('email') as FormControl;
  }
  get gender(): FormControl {
    return this.settingsForm.get('gender') as FormControl;
  }
  get birthDate(): FormControl {
    return this.settingsForm.get('birthDate') as FormControl;
  }
  get address(): FormControl {
    return this.settingsForm.get('address') as FormControl;
  }

  constructor(private fb: FormBuilder) {
    this.date = moment(new Date()).format('YYYY-MM-DD').toString();
    this.settingsForm = this.fb.group({
      id: [null, [Validators.required]],
      firstName: [null, [Validators.required, Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      gender: [null, [Validators.maxLength(20)]],
      birthDate: [null],
      address: [null, [Validators.maxLength(50)]],
    });
  }
  ngOnInit(): void {
    this.settingsForm.patchValue(this.user);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
