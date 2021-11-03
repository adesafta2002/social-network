import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IUserState } from "../state/user.state";

const selectUserState = (state: IAppState) => state.user

export const selectUser = createSelector(
    selectUserState,
    (state: IUserState) => state.user
)

export const selectUserToken = createSelector(
    selectUserState,
    (state: IUserState) => state.token
)

export const selectUserLoading = createSelector(
    selectUserState,
    (state: IUserState) => state.loading
)