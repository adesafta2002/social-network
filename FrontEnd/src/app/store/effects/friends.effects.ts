import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { get } from 'lodash';
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { AuthService } from "src/app/shared/services/auth.service";
import * as friendsActions from "../actions/friends.actions";
import { UserService } from "src/app/shared/services/user.service";


@Injectable()
export class FriendsEffects {
    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(friendsActions.getSelectedUser),
        map(action => action.payload),
        mergeMap(payload => this.userService.getSelected(payload).pipe(
            mergeMap(res => {
                const selected = get(res, 'selected', {});
                return of(friendsActions.getSelectedUserSuccess({ selected }));
            }),
            catchError(err => of(friendsActions.getSelectedUserError()))
        )),
    ));

    // loginUser$ = createEffect(() => this.actions$.pipe(
    //     ofType(userActions.loginUser),
    //     map(action => action.payload),
    //     mergeMap(user => this.authService.loginUser(user).pipe(
    //         mergeMap(res => {
    //             const user = get(res, 'user', {});
    //             const token = get(res, 'token', null);
    //             this.router.navigate(['/main/profile/', user.id]);
    //             this.notificationService.sendNotification({ type: 'success', message: 'Login Successful.' });
    //             return of(userActions.loginUserSuccess({ user, token }));
    //         }),
    //         catchError(err => {
    //             return of(userActions.loginUserError());
    //         }
    //         )))
    // ));

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private router: Router,
        private notificationService: NotificationService
    ) { }
};