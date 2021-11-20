import { createContext, useContext } from "react";
import ChatModeStore from "./chatboxstore";
import DarkModeStore from "./darkmodestore";

interface Store {
    activitystore: DarkModeStore
}
interface Chat {
    chatstore: ChatModeStore
}

export const dark: Store = {
    activitystore: new DarkModeStore()
}
export const chat: Chat = {
    chatstore: new ChatModeStore()
}

export const DarkContext = createContext(dark)
export const ChatContext = createContext(chat)

export function useDarkMode() {
    return useContext(DarkContext)
}
export function UseChatMode() {
    return useContext(ChatContext)
}