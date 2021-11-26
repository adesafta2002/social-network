import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { get } from 'lodash';
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UserService } from "src/app/shared/services/user.service";
import * as userActions from "../actions/user.actions";


@Injectable()
export class UserEffects {
    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.registerUser),
        map(action => action.payload),
        mergeMap(user => this.userService.registerUser(user).pipe(
            mergeMap(res => {
                return of(userActions.registerUserSuccess());
            }),
            catchError(err => of(userActions.registerUserError()))
        )),
    ));

    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.loginUser),
        map(action => action.payload),
        mergeMap(user => this.userService.loginUser(user).pipe(
            mergeMap(res => {
                const user = get(res, 'user', {});
                const token = get(res, 'token', null);
                this.router.navigate(['/home'])
                return of(userActions.loginUserSuccess({ user, token }));
            }),
            catchError(err => {
                return of(userActions.loginUserError())
            }
            )))
    ));

    restoreUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.restoreUserSession),
        map(action => action.payload),
        mergeMap(userToken => this.userService.restoreUserSesssion(userToken).pipe(
            map((res) => {
                const user = get(res, 'user', {});
                const token = get(res, 'token', null);
                this.router.navigate(['/home'])
                return userActions.loginUserSuccess({ user, token });
            }),
            catchError(err => of(userActions.loginUserError()))

        )),
    ));

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router
    ) { }
};