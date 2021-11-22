import { makeAutoObservable } from "mobx";
import React, { createContext, useContext } from "react";
export default class SideBarMode {

    SideBarCollapseMode = false;

    constructor() {
        makeAutoObservable(this)
    }

    setSideBarCollapseMode = () => {
        this.SideBarCollapseMode = !this.SideBarCollapseMode;
    }
}
interface SideBar {
    sidestore: SideBarMode
}

export const sidebar: SideBar = {
    sidestore: new SideBarMode()
}

export const SideBarContext = createContext(sidebar)

export function UseSideBar() {
    return useContext(SideBarContext)
}