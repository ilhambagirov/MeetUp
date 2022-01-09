import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";
import { User } from "../models/user";
import { dark } from "./store";

export default class ProfileStore {
    profile: User | Promise<User>  | null = null

    constructor() {
        makeAutoObservable(this)
        if (window.location.pathname.includes('userprofile')) {
            var point = window.location.pathname.lastIndexOf('/')
            runInAction((()=> this.profile = this.loadProfile(window.location.pathname.substring(point + 1))))
        }
    }
    loadProfile = async (userName: string) => {
        try {
            const user = await agent.Account.userProfile(userName)
            runInAction(() => this.profile = user)
            dark.postStore.postRegistry.clear()
            user.posts?.forEach((a: Post) => dark.postStore.setActivity(a))
            return user;
        } catch (error) {
            throw error
        }
    }
}