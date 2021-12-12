import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";

export default class PostStore {
    postRegistry: Post[] = [];
    SelectedActivity: Post | undefined = undefined;
    constructor() {
        makeAutoObservable(this)
    }
    loadActivities = async () => {
        try {
            const activities = await agent.Posts.list();

            activities.forEach(a => {
                this.setActivity(a)
            })
        } catch (error) {
            console.log(error)
        }
    }
    private setActivity = (a: Post) => {
        this.postRegistry.push(a);
    }
}