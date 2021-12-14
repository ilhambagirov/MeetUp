import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post, PostFormValues } from "../models/post";

export default class PostStore {
    postRegistry = new Map<number, Post>();

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

    get groupedPosts() {
        const array = Array.from(this.postRegistry, ([id, value]) => ({ id, value }));
        return array
    }

    deletePost = async (id: number) => {
        try {
            const post = await agent.Posts.delete(id);
            runInAction(() => {
                this.postRegistry.delete(id)
            })
        } catch (error) {
            console.log(error)
        }
    }

    createActivity = async (post: PostFormValues) => {
        try {
            await agent.Posts.create(post);
            const newPost = new Post(post)
            this.setActivity(newPost)
        }
        catch (error) {
            console.log(error)
        }

    }

    private setActivity = (a: Post) => {
        this.postRegistry.set(a.id, a);
    }
}