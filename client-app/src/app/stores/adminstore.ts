import signalR, { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { dark } from "./store";
import { User, UserFormValues } from "../../app/models/user";
import { PostComment } from "../models/comment";
import { history } from "../..";

export default class AdminStore {
    admin: number | null =  null

    constructor() {
        makeAutoObservable(this)
    }

    login = async (creds: UserFormValues) => {
        try {
            // const user = await agent.Account.login(creds)
            // dark.commonStore.setToken(user.token)
            // runInAction(() => this.user = user)
            // 
            // console.log(this.user)
            runInAction(()=>this.admin = 1)
            console.log(creds)
            history.push('/adminDashboard')
        } catch (error) {
            console.log('partladi')
            throw error;
        }
    }
}