import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { dark } from "./store";

export default class UserStore {

    user: User | null = null

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        console.log(!!this.user)
        return !!this.user
    }

    login = async (creds: UserFormValues) => {
        console.log(creds)
        try {
            const user = await agent.Account.login(creds)
            dark.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push("/home")
        } catch (error) {
            console.log('partladi')
            throw error;
        }
    }

    logout = () => {
        dark.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
        history.push("/")
    }

    getUser = async () => {
        try {
            const user = await agent.Account.Current()
            runInAction(() => this.user = user)
        } catch (error) {
            throw error
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds)
            dark.commonStore.setToken(user.data.token)
            runInAction(() => this.user = user.data)
            history.push("/activities")
        } catch (error) {
            throw error;
        }
    }




}