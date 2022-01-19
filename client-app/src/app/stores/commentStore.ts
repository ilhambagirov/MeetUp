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
    createHubConnection = (postId: number) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44395/chat?postId=' + postId.toString(), {
                accessTokenFactory: () => localStorage.getItem('jwt'),
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build()
        this.hubConnection.start().catch(error => console.log("Error while connection", error))

        this.hubConnection.on("LoadComments", (comments: PostComment[]) => {
            runInAction(() => this.comments = comments)
        });

        this.hubConnection.on("ReceiveComment", (comment: PostComment) => {
            runInAction(() => this.comments.unshift(comment))
        });
    }
    stopHubConnection = () => {
        this.hubConnection.stop().catch(error => console.log("Error connection stopping", error))
    }

    clearComments = () => {
        this.comments = []
        this.stopHubConnection()
    }

    addComment = async (values: any) => {
        try {
            await this.hubConnection.invoke('SendComment', values)
        } catch (error) {
            console.log(error)
        }
    }
}