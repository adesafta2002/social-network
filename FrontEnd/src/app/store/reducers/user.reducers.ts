import { Action, createReducer, on, props } from "@ngrx/store";
import { IUser } from "src/app/models/user.interface";
import * as UserActions from '../actions/user.actions';
import { initialUserState, IUserState } from "../state/user.state";

const _userReducers = createReducer(
    initialUserState,
    on(UserActions.registerUser, state => ({ ...state, loading: true })),
    on(UserActions.registerUserSuccess, state => ({ ...state, loading: false })),
    on(UserActions.registerUserError, state => ({ ...state, loading: false })),
    on(UserActions.loginUser, state => ({ ...state, loading: false })),
    on(UserActions.loginUserSuccess, (state, payload) => ({ user: payload.user, token: payload.token, loading: false })),
    on(UserActions.loginUserError, state => ({ ...state, loading: false })),
);

export function userReducers(state: IUserState, action: Action) {
    return _userReducers(state, action);
}