import { createContext, useContext } from "react";
import commonStore from "./commonStore";
import DarkModeStore from "./darkmodestore";
import PostStore from "./poststore";
import ProfileStore from "./profileStore";
import UserStore from "./userStore";

interface Store {
    activitystore: DarkModeStore,
    commonStore: commonStore,
    postStore: PostStore
    userStore: UserStore
    profileStore: ProfileStore
}

export const dark: Store = {
    activitystore: new DarkModeStore(),
    postStore: new PostStore(),
    userStore: new UserStore(),
    commonStore: new commonStore(),
    profileStore: new ProfileStore()
}

export const DarkContext = createContext(dark)

export function useDarkMode() {
    return useContext(DarkContext)
}
