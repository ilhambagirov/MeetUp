import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { message } from "antd";
import { makeAutoObservable, runInAction } from "mobx";
import React from "react";
import agent from "../api/agent";
import { Message } from "../models/message";
import { User, UserFormValues } from "../models/user";
import { dark } from "./store";
export default class ChatStore {

    users: User[] = [];
    boxMode: boolean = false
    messages: Message[] = []
    hubConnection: HubConnection | null = null
    receiverName: string

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
                this.createHubConnection()
                runInAction(() => this.receiverName = id)
            }
            else {
                this.hubConnection.stop().catch(error => console.log("Error connection stopping", error))
            }
        } catch (error) {
            throw error
        }
    }
    createHubConnection = () => {
        var user = dark.userStore.user as User
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44395/chat?username=' + user.userName, {
                accessTokenFactory: () => localStorage.getItem('jwt'),
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()

        this.hubConnection.start().catch(error => console.log("Error while connection", error))

        this.hubConnection.on("ReceiveMessage", (message: Message, date: Date) => {
            message.date = date
            runInAction(() => this.messages.push(message))
        });
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


