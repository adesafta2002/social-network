import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { userReducers } from "./user.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    user: userReducers,
}