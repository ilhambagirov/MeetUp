import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { dark } from "./store";
import { ChangePassword } from "../models/userPasswordChange";
import { toast } from "react-toastify";
import { Post } from "../models/post";
import jwt_decode from "jwt-decode";

export default class UserStore {
    // Jwt: string | null = window.localStorage.getItem('jwt')
    // token: string = this.Jwt == null ? '' : this.Jwt
    // DecodedJwt: User | null = this.token == '' ? null : jwt_decode(this.token)
    user: User | Promise<User> | null = null
    // this.DecodedJwt == null ? null : {
    //     id: this.DecodedJwt.id,
    //     dsiplayName: this.DecodedJwt.dsiplayName,
    //     userName: this.DecodedJwt.userName,
    //     token: window.localStorage.getItem('jwt')!
    // }

    constructor() {
        makeAutoObservable(this)
       runInAction((()=> this.user = this.getUser()))
        // this.Jwt = window.localStorage.getItem('jwt')
        console.log(this.user)
    }
    get isLoggedIn() {
        return !!this.user
    }


    getUser = async () => {
        try {
            const user = await agent.Account.Current()
            runInAction(() => this.user = user)
            dark.postStore.postRegistry.clear()
            user.posts?.forEach((a: Post) => dark.postStore.setActivity(a))
            return user;
        } catch (error) {
            throw error
        }
    }

    login = async (creds: UserFormValues) => {
        console.log(creds)
        try {
            const user = await agent.Account.login(creds)
            dark.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push("/home")
            console.log(this.user)
        } catch (error) {
            console.log('partladi')
            throw error;
        }
    }

    logout = () => {
        console.log("salamun aleykum")
        dark.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
        dark.postStore.postRegistry.clear()
        history.push("/")
    }

    changeUserPassword = async (creds: ChangePassword) => {
        try {
            await agent.Account.changePassword(creds)
            history.push("/home")
            toast.success("Password Changed!")
        } catch (error) {
            throw error;
        }
    }

    updateUserDetails = async (creds: UserFormValues) => {
        try {
            await agent.Account.updateUserDetails(creds)
            toast.success("Account Saved!")
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            dark.commonStore.setToken(user.data.token)
            history.push("/")
        } catch (error) {
            throw error;
        }
    }




}