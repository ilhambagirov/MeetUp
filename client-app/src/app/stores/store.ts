import { createContext, useContext } from "react";
import commonStore from "./commonStore";
import DarkModeStore from "./darkmodestore";
import PostStore from "./poststore";
import UserStore from "./userStore";

interface Store {
    activitystore: DarkModeStore,
    commonStore: commonStore,
    postStore: PostStore
    userStore: UserStore
    
}

export const dark: Store = {
    activitystore: new DarkModeStore(),
    postStore: new PostStore(),
    userStore: new UserStore(),
    commonStore: new commonStore(),
    
}

export const DarkContext = createContext(dark)

export function useDarkMode() {
    return useContext(DarkContext)
}
