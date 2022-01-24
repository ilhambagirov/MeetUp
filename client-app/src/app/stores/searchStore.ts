import { makeAutoObservable, runInAction } from "mobx";
import React from "react";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";

export default class SearchStore {
    users: User[] = [];
    constructor() {
        makeAutoObservable(this)
    }

    searchUser = async () => {
        try {
            console.log('aue')
            const user = await agent.Account.searchUser()
            runInAction(() => this.users = user)
        } catch (error) {
            throw error
        }
    }
}
