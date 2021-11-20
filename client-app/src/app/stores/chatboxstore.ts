import { makeAutoObservable } from "mobx";
import React from "react";


export default class ChatModeStore {

    ChatMode = false;

    constructor() {
        makeAutoObservable(this)
    }

    setChatMode = () => {
        this.ChatMode = !this.ChatMode;
    }
}