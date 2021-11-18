import { makeAutoObservable } from "mobx";
import React from "react";

export default class DarkModeStore {

    darkMode = false;

    constructor() {
        makeAutoObservable(this)
    }

    setDarkMode = () => {
        this.darkMode = !this.darkMode;
    }
}