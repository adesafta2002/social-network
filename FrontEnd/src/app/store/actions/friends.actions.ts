import { createAction, props } from "@ngrx/store";
import { IAccessToken } from "src/app/models/access-token.interface";
import { IUser } from "src/app/models/user.interface";

export const searchFriends = createAction(
    '[Friends] Search Friends',
    props<{ payload: { name: string, _summary: string } }>()
);

export const searchFriendsSuccess = createAction(
    '[Friends] Search Friends Success',
    props<{ friends: IUser[] }>()
);

export const searchFriendsError = createAction(
    '[Friends] Search Friends Error'
);

export const getSelectedUser = createAction(
    '[Friends] Get Selected User',
    props<{ payload: { id: number } }>()
);

export const getSelectedUserSuccess = createAction(
    '[Friends] Get Selected User Success',
    props<{ selected: IUser }>()
);

export const getSelectedUserError = createAction(
    '[Friends] Get Selected User Error'
);