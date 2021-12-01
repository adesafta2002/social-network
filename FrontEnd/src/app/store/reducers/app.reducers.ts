import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { friendsReducers } from "./friends.reducers";
import { userReducers } from "./user.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    user: userReducers,
    friends: friendsReducers

}

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log(action.type);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [debug];