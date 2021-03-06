import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { message } from "antd";
import { makeAutoObservable, runInAction } from "mobx";
import React from "react";
import agent from "../api/agent";
import { Message } from "../models/message";
import { User } from "../models/user";
import { Notification, NotificationDto } from "../models/notification";
import { dark } from "./store";
import { PostComment } from "../models/comment";
import { Pagination, PagingParams } from "../models/pagination";
export default class ChatStore {

    users: User[] = [];
    usersRecomended: User[] = [];
    boxMode: boolean = false
    messages: Message[] = []
    hubConnection: HubConnection | null = null
    receiverName: string
    notificationRegistry = new Map<number, NotificationDto>();
    notificationMode = false
    notificationCount = 0
    pagingParams = new PagingParams()
    pagination: Pagination | null = null

    constructor() {
        makeAutoObservable(this)
    }
    getUsers = async () => {
        try {
            const user = await agent.Chat.usersList()
            runInAction(() => this.users = user)
        } catch (error) {
            throw error
        }
    }
    updateFollowing = async (userName: string, following: boolean) => {
        try {
            await agent.Account.updateFolowing(userName)
            runInAction(() => {
                var user = this.usersRecomended.filter(x => x.userName === userName)[0]
                user.following = !following
            })
        } catch (error) {
            throw error
        }
    }

    getUsersRecomended = async () => {
        try {
            const user = await agent.Chat.usersRecomended()
            console.log(user)
            runInAction(() => this.usersRecomended = user)
        } catch (error) {
            throw error
        }
    }
    get groupedNotifcations() {
        var result = Array.from(this.notificationRegistry, ([id, value]) => ({ id, value }))
            .sort(function (a, b) {
                var dateA = new Date(a.value.createdDate).getTime();
                var dateB = new Date(b.value.createdDate).getTime();
                return dateA < dateB ? 1 : -1
            });
        return result
    }
    stopHubConnection = () => {
        this.hubConnection.stop().catch(error => console.log("Error connection stopping", error))
    }
    get axiosParams() {
        const params = new URLSearchParams()
        params.append('pageIndex', this.pagingParams.pageIndex.toString())
        params.append('pageSize', this.pagingParams.pageSize.toString())
        return params
    }
    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams
    }
    loadNotifications = async () => {
        try {
            this.setPagingParams(new PagingParams(1, 7))
            const result = await agent.Notifications.list(this.axiosParams);
            result.data.map(item => (
                runInAction(() => this.setNotification(item))
            ))
            this.setPagination(result.pagination)
        } catch (error) {
            console.log(error)
        }
    }
    setNotification = (a: NotificationDto) => {
        this.notificationRegistry.set(a.id, a);
    }
    loadNotificationsPagination = async () => {
        try {
            setTimeout(async () => {
                const result = await agent.Notifications.list(this.axiosParams);
                result.data.map(item => (
                    runInAction(() => this.setNotification(item))
                ))
                this.setPagination(result.pagination)
            }, 500);
        } catch (error) {
            console.log(error)
        }
    }
    setPagination(pagination: Pagination) {
        this.pagination = pagination
    }
    getMessages = async (id: string) => {
        try {
            const message = await agent.Chat.messages(id)
            console.log(message)
            runInAction(() => this.messages = message)
        } catch (error) {
            throw error
        }
    }
    setBoxMode = async (id: string) => {
        try {
            this.boxMode = !this.boxMode
            if (this.boxMode) {
                console.log(id)
                this.getMessages(id)
                runInAction(() => this.receiverName = id)
                console.log(this.receiverName)
            }
        } catch (error) {
            throw error
        }
    }
    createHubConnection = () => {
        var user = dark.userStore.user as User
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_CHAT_URL, {
                accessTokenFactory: () => localStorage.getItem('jwt'),
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()

        this.hubConnection.start().catch(error => console.log("Error while connection", error))

        this.hubConnection.on("ReceiveMessage", (message: Message, notification: any, date: Date) => {
            message.date = date
            runInAction(() => {
                console.log(message)
                this.messages.push(message)
                this.notificationCount++
                this.beep()
            })
        });
    }

    beep = () => {
        var notify = require("../../assets/sounds/that-was-quick-606.mp3")
        var snd = new Audio(notify.default);
        snd.play();
    }
    sendMessage = async (values: any) => {
        try {
            await this.hubConnection.invoke('SendMessage', this.receiverName, values.message)
            runInAction(() => this.messages.push(values.message))
        } catch (error) {
            console.log(error)
        }
    }
}


