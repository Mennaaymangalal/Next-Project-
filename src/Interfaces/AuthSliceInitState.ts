import { UserI } from "./UserI";

export interface AuthSliceIniteState {
    isLoggedIn: boolean,
    user: UserI | null
}