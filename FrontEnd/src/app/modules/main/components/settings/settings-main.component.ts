import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.interface';
import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, takeWhile, take, catchError } from "rxjs/operators"
import { selectUser } from 'src/app/store/selectors/user.selectors';
import { UserService } from 'src/app/shared/services/user.service';
import { cloneDeep } from 'lodash';
import { Observable, ObservableInput, of } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'settings-main',
  templateUrl: 'settings-main.component.html',
  styleUrls: ['settings-main.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: IUser;
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

  constructor(private fb: FormBuilder, private store: Store, private _userService: UserService, private _notificationsService: NotificationsService) {
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
    this.store.pipe(select(selectUser)).
      pipe(
        takeWhile(() => this.alive),
        distinctUntilChanged()
      ).subscribe(
        (user: IUser) => {
          if (!user) {
            return;
          }
          this.user = user;
          this.mapUserToSettingsForm(user);
        }
      );
    this.email.disable();
  }

  mapUserToSettingsForm(user: IUser) {
    const newUser = cloneDeep(user);
    newUser.birthDate = moment(user.birthDate).format('YYYY-MM-DD').toString();
    newUser.gender = +user.gender;
    this.settingsForm.patchValue(newUser);
  }

  saveChanges() {
    if (!this.settingsForm.valid) {
      return;
    }
    this._userService.updateUser(this.settingsForm.getRawValue()).pipe(
      take(1),
      catchError(err => this.handleUserUpdateError(err))
    ).subscribe(res =>
      this._notificationsService.createMessage('success', 'User', 'User updated')
    );
  }

  handleUserUpdateError(err): Observable<any> {
    this.mapUserToSettingsForm(this.user);
    this._notificationsService.createMessage('error', 'User', err);
    return of(null);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
