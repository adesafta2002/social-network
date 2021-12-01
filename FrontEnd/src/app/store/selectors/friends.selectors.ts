import { createSelector } from "@ngrx/store";
import { IAppState } from "../state/app.state";
import { IFriendsState } from "../state/friends.state";

const selectFriendsState = (state: IAppState) => state.friends

export const selectFriendsEntities = createSelector(
    selectFriendsState,
    (state: IFriendsState) => state.friends
)

export const selectFriendsSelected = createSelector(
    selectFriendsState,
    (state: IFriendsState) => state.selected
)

export const selectFriendsLoading = createSelector(
    selectFriendsState,
    (state: IFriendsState) => state.loading
)