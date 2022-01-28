import signalR, { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { dark } from "./store";
import { User, UserFormValues } from "../../app/models/user";
import { PostComment } from "../models/comment";
import { history } from "../..";
import agent from "../api/agent";

export default class AdminStore {
    admin: number | null = null
    user: User | null = null

    constructor() {
        makeAutoObservable(this)
        if (localStorage.getItem("adm") !== null) {
            runInAction(() => this.admin = 1)
        } else {
            runInAction(() => this.admin = null)
        }
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Admin.login(creds)
            console.log(user)
            runInAction(() => this.user = user)
            runInAction(() => this.admin = 1)
            localStorage.setItem("adm", user.token)
            history.push('/adminDashboard')
        } catch (error) {
            console.log('partladi')
            throw error;
        }
    }
    logout = async () => {
        window.localStorage.removeItem('adm')
        this.user = null
        history.push("/admin")
    }
}