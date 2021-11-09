import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { UserService } from "src/app/shared/services/user.service";
import * as userActions from "../actions/user.actions";


@Injectable()
export class UserEffects {
    registerUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.registerUser),
        map(action => action.payload),
        mergeMap(user => this.userService.registerUser(user)),
        mergeMap(res => {
            return of(userActions.registerUserSuccess());
        })
    ));
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
};