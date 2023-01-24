import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { get } from 'lodash';
import { MessageService } from "primeng/api";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AuthService } from "src/app/shared/services/auth.service";
import { NotificationsService } from "src/app/shared/services/notifications.service";
import * as userActions from "../actions/user.actions";


@Injectable()
export class UserEffects {
    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.registerUser),
        map(action => action.payload),
        mergeMap(user => this.authService.registerUser(user).pipe(
            mergeMap(res => {
                this.notificationsService.createMessage('success', 'Success', 'Your registration is now complete, you can log into your account.');
                return of(userActions.registerUserSuccess());
            }),
            catchError(err => of(userActions.registerUserError()))
        )),
    ));

    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.loginUser),
        map(action => action.payload),
        mergeMap(user => this.authService.loginUser(user).pipe(
            mergeMap(res => {
                const user = get(res, 'user', {});
                const token = get(res, 'token', null);
                this.router.navigate(['/main/feed/']);
                this.notificationsService.createMessage('success', 'Success', 'Login Successful.');
                return of(userActions.loginUserSuccess({ user, token }));
            }),
            catchError(err => {
                return of(userActions.loginUserError());
            }
            )))
    ));

    restoreUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.restoreUserSession),
        map(action => action.payload),
        mergeMap(userToken => this.authService.restoreUserSesssion(userToken).pipe(
            map((res) => {
                const user = get(res, 'user', {});
                const token = get(res, 'token', null);
                this.router.navigate(['/main/feed/']);
                return userActions.loginUserSuccess({ user, token });
            }),
            catchError(err => of(userActions.loginUserError()))

        )),
    ));

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private notificationsService: NotificationsService
    ) { }
};