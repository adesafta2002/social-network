import { createAction, props } from "@ngrx/store";
import { IAccessToken } from "src/app/models/access-token.interface";
import { IUser } from "src/app/models/user.interface";

export const registerUser = createAction(
    '[User] Register User',
    props<{ payload: { email: string, password: string, firstName: string, lastName: string } }>()
);

export const registerUserSuccess = createAction(
    '[User] Register User Success'
);

export const registerUserError = createAction(
    '[User] Register User Error'
);

export const loginUser = createAction(
    '[User] Login User',
    props<{ payload: { email: string, password: string } }>()
);

export const logOutUser = createAction(
    '[User] Logout User',
);

export const restoreUserSession = createAction(
    '[User] Restore User Session',
    props<{ payload: { token: string } }>()
);

export const loginUserSuccess = createAction(
    '[User] Login User Success',
    props<{ user: IUser, token: string }>()
);

export const loginUserError = createAction(
    '[User] Login User Error'
);