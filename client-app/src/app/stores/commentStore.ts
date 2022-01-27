import signalR, { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { dark } from "./store";
import { User } from "../../app/models/user";
import { PostComment } from "../models/comment";

export default class CommentStore {
    comments: PostComment[] = []
    hubConnection: HubConnection | null = null
    commentMode = 0

    constructor() {
        makeAutoObservable(this)
    }

    setCommentMode = (id: number) => {
        runInAction(() => {
            this.commentMode = id
        })
    }
    createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44395/chat', {
                accessTokenFactory: () => localStorage.getItem('jwt'),
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()
        this.hubConnection.serverTimeoutInMilliseconds = 100000
        this.hubConnection.start().catch(error => console.log("Error while connection", error))

        this.hubConnection.on("LoadComments", (comments: PostComment[]) => {
            runInAction(() => this.comments = comments)
        });
        this.hubConnection.on("ReceiveComment", (comment: PostComment) => {
            runInAction(() => {
                console.log(comment)
                this.comments.unshift(comment)
            })
        });
        this.hubConnection.on("ReceiveNotification", (test: any) => {
            runInAction(() => {
                dark.chatStore.notificationCount++
                this.beep()
            })
        });
    }
    beep = () => {
        var notify = require("../../assets/sounds/that-was-quick-606.mp3")
        var snd = new Audio(notify.default);
        snd.play();
    }
    stopHubConnection = () => {
        this.hubConnection.stop().catch(error => console.log("Error connection stopping", error))
    }
    clearComments = () => {
        this.comments = []
        this.stopHubConnection()
    }

    addComment = async (values: any, userId: string) => {
        try {
            await this.hubConnection.invoke('SendComment', values)
            await this.hubConnection.invoke('SendNotification', userId)
        } catch (error) {
            console.log(error)
        }
    }
    loadComment = async (postId: string) => {
        try {
            console.log(postId)
            await this.hubConnection.invoke('LoadComment', postId)
        } catch (error) {
            console.log(error)
        }
    }
}