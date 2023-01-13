import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { get } from 'lodash';
import { MessageService } from "primeng/api";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { IUser } from "src/app/models/user.interface";
import { UserService } from "src/app/shared/services/user.service";
import * as friendsActions from "../actions/friends.actions";
import { IFriendsState } from "../state/friends.state";


@Injectable()
export class FriendsEffects {
    getSelectedUser$ = createEffect(() => this.actions$.pipe(
        ofType(friendsActions.getSelectedUser),
        map(action => action.payload),
        mergeMap(payload => this.userService.getSelected(payload).pipe(
            mergeMap(res => {
                const selected = get(res, 'user', '');
                return of(friendsActions.getSelectedUserSuccess({ selected }));
            }),
            catchError(err => of(friendsActions.getSelectedUserError()))
        )),
    ));

    searchFriends$ = createEffect(() => this.actions$.pipe(
        ofType(friendsActions.searchFriends),
        map(action => action.payload),
        mergeMap(payload => this.userService.getFriends(payload).pipe(
            mergeMap(res => {
                const friends: IUser[] = get(res, 'entry', '');
                return of(friendsActions.searchFriendsSuccess({ friends }));
            }),
            catchError(err => of(friendsActions.searchFriendsError()))
        ))
    ));

    // loginUser$ = createEffect(() => this.actions$.pipe(
    //     ofType(userActions.loginUser),
    //     map(action => action.payload),
    //     mergeMap(user => this.authService.loginUser(user).pipe(
    //         mergeMap(res => {
    //             const user = get(res, 'user', {});
    //             const token = get(res, 'token', null);
    //             this.router.navigate(['/main/profile/', user.id]);
    //              this.messageService.add({ type: 'success', message: 'Login Successful.' });
    // setTimeout(() => {
    //     this.messageService.clear();
    // }, 2000);
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
        private messageService: MessageService
    ) { }
};