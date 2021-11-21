import { makeAutoObservable } from "mobx";
import React, { createContext, useContext } from "react";
export default class ChatModeStore {

    ChatMode = false;

    constructor() {
        makeAutoObservable(this)
    }

    setChatMode = () => {
        this.ChatMode = !this.ChatMode;
    }
}
interface Chat {
    chatstore: ChatModeStore
}

export const chat: Chat = {
    chatstore: new ChatModeStore()
}

export const ChatContext = createContext(chat)

export function UseChatMode() {
    return useContext(ChatContext)
}