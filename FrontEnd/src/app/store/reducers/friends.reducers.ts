import { Action, createReducer, on } from "@ngrx/store";
import * as FriendsActions from '../actions/friends.actions';
import { IFriendsState, initialFriendsState } from "../state/friends.state";

const _friendsReducers = createReducer(
    initialFriendsState,
    on(FriendsActions.searchFriends, state => ({ ...state, loading: true })),
    on(FriendsActions.searchFriendsSuccess, (state, payload) => ({ ...state, friends: payload.friends, loading: false })),
    on(FriendsActions.searchFriendsError, state => ({ ...state, loading: false })),
    on(FriendsActions.getSelectedUser, state => ({ ...state, loading: true })),
    on(FriendsActions.getSelectedUserSuccess, (state, payload) => ({ ...state, selected: payload.selected, loading: false })),
    on(FriendsActions.getSelectedUserError, state => ({ ...state, selected: null, loading: false }))
);

export function friendsReducers(state: IFriendsState, action: Action) {
    return _friendsReducers(state, action);
}