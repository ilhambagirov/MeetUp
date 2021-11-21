import { createContext, useContext } from "react";
import DarkModeStore from "./darkmodestore";

interface Store {
    activitystore: DarkModeStore
}

export const dark: Store = {
    activitystore: new DarkModeStore()
}

export const DarkContext = createContext(dark)

export function useDarkMode() {
    return useContext(DarkContext)
}
