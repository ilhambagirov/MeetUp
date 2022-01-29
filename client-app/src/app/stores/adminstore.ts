import signalR, { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { dark } from "./store";
import { User, UserFormValues } from "../../app/models/user";
import { PostComment } from "../models/comment";
import { history } from "../..";
import agent from "../api/agent";
import swal from "sweetalert";

export default class AdminStore {
    admin: number | null = null
    user: User | null = null
    users: User[] = []

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

    loadUsers = async () => {
        try {
            const user = await agent.Admin.adminUserList()
            console.log(user)
            runInAction(() => this.users = user)
        } catch (error) {
            throw error
        }
    }
    banUser = async (user: User, text: string, text2: string) => {
        try {
            swal({
                title: "Are you sure?",
                text: `You will ${text} ${user?.userName}!`,
                icon: "warning",
                buttons: ["Cancel", "Yes!"],
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        try {
                            await agent.Admin.banUser(user.userName!)
                            runInAction(() => {
                                this.users.filter(x=>x.userName === user?.userName)[0].isBanned = !user?.isBanned
                            })
                        } catch (error) {
                            throw error
                        }
                        swal(`Poof! You have ${text2} ${user?.userName}`, {
                            icon: "success",
                        });
                    } else {
                        swal("Your post is safe!");
                    }
                });
        } catch (error) {
            throw error
        }
    }
}