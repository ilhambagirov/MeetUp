import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";
import { User } from "../models/user";
import { dark } from "./store";

export default class ProfileStore {
    profile: User | Promise<User> | null = null
    followings: User[] = []

    constructor() {
        makeAutoObservable(this)
        if (window.location.pathname.includes('userprofile')) {
            var point = window.location.pathname.lastIndexOf('/')
            runInAction((() => this.profile = this.loadProfile(window.location.pathname.substring(point + 1))))
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

    changeImage = async (file: any) => {
        try {
            const user = await agent.Photos.create(file).then(result => result.data)
            runInAction(() => {
                var p = this.profile as User
                p.image = user.image
                var i = dark.userStore.user as User
                i.image = user.image
            })
            return user;
        } catch (error) {
            throw error
        }
    }

    updateFollowing = async (userName: string, following: boolean) => {
        try {
            await agent.Account.updateFolowing(userName)
            // dark.postStore.updatePostUserFollowing(userName)
            var profile = this.profile as User
            var user = dark.userStore.user as User
            runInAction(() => {
                if (this.profile && profile.userName !== user.userName) {
                    following ? profile.followersCount-- : profile.followersCount++
                    profile.following = !profile.following
                }
                // this.followings.forEach(profile1 => {
                //     if(profile1.userName === userName){
                //         profile1.following? profile1.followersCount -- : profile1.followersCount++
                //         profile1.following = !profile1.following
                //     }
                // }
                // )
                this.profile = profile
            })
        } catch (error) {
            throw error
        }
    }
    updateFollowings = async (userName: string, following: boolean) => {
        try {
            await agent.Account.updateFolowing(userName)
            runInAction(() => {
                var user = this.followings.filter(x => x.userName === userName)[0]
                user.following = !following
                if (following) {
                    this.followings = this.followings.filter(x=>x.userName !== userName)
                }
            })
        } catch (error) {
            throw error
        }
    }

    loadFollow = async (predicate: string) => {
        try {
            var profile = this.profile as User
            var followList = await agent.Account.listFollow(profile.userName, predicate)
            runInAction(() => {
                this.followings = followList
            })
        } catch (error) {
            throw error
        }
    }
    loadFollows = async (username: string, predicate: string) => {
        try {
            var followList = await agent.Account.listFollow(username, predicate)
            runInAction(() => {
                this.followings = followList
            })
        } catch (error) {
            throw error
        }
    }
}