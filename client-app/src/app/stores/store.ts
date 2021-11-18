import { createContext, useContext } from "react";
import DarkModeStore from "./darkmodestore";

interface Store {
    activitystore: DarkModeStore
}

export const store: Store = {
    activitystore: new DarkModeStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}