import { IUser } from "src/app/models/user.interface";

export interface IFriendsState {
    friends: IUser[];
    loading?: boolean;
    selected?: IUser;
}

export const initialFriendsState: IFriendsState = {
    friends: null,
    loading: false,
    selected: null,
}