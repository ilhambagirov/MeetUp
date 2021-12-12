import { createContext, useContext } from "react";
import commonStore from "./commonStore";
import DarkModeStore from "./darkmodestore";
import PostStore from "./poststore";
import UserStore from "./userStore";

interface Store {
    activitystore: DarkModeStore,
    commonStore: commonStore,
    userStore: UserStore
    postStore : PostStore
}

export const dark: Store = {
    activitystore: new DarkModeStore(),
    commonStore: new commonStore(),
    userStore: new UserStore(),
    postStore : new PostStore()
}

export const DarkContext = createContext(dark)

export function useDarkMode() {
    return useContext(DarkContext)
}
