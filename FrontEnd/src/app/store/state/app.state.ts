import { RouterReducerState } from "@ngrx/router-store";
import { IFriendsState, initialFriendsState } from "./friends.state";
import { initialUserState, IUserState } from "./user.state";

export interface IAppState {
    router?: RouterReducerState;
    user: IUserState;
    friends: IFriendsState;
}

export const initialAppState: IAppState = {
    user: initialUserState,
    friends: initialFriendsState
};

export function getInitialState(): IAppState {
    return initialAppState;
}