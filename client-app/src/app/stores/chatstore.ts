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
    boxMode: boolean = false
    messages: Message[] = []
    hubConnection: HubConnection | null = null
    receiverName: string
    notifications: NotificationDto[] = []
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
            runInAction(() => this.notifications = result.data)
            this.setPagination(result.pagination)
        } catch (error) {
            console.log(error)
        }
    }
    loadNotificationsPagination = async () => {
        try {
            setTimeout(async () => {
                console.log(this.pagingParams)
                const result = await agent.Notifications.list(this.axiosParams);
                result.data.map(item => (
                    runInAction(() => this.notifications.push)
                ))
                runInAction(() => this.notifications = result.data)
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
            }
        } catch (error) {
            throw error
        }
    }
    createHubConnection = () => {
        var user = dark.userStore.user as User
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44395/chat', {
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


