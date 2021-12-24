import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post, PostFormValues } from "../models/post";
import { Profile } from "../models/profile";
import { dark } from "./store";

export default class PostStore {
    postRegistry = new Map<number, Post>();
    editMode = 0
    postDrop = 0

    constructor() {
        makeAutoObservable(this)
    }

    setEditMode = (id: number) => {
        this.editMode = id
    }
    setPostDropDown = (id: number) => {
        this.postDrop = id
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Posts.list();
            activities.forEach(a => {
                this.setActivity(a)
            })
            console.log(this.groupedPosts)
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
        const user = dark.userStore.user
        const createdUser = new Profile(user!)
        try {
            var createdPost = await agent.Posts.create(post);
            console.log(createdPost)
            createdPost.createdByUser = createdUser
           
            this.setActivity(createdPost)
        }
        catch (error) {
            console.log(error)
        }

    }

    updateActivity = async (post: PostFormValues) => {
        try {
            await agent.Posts.edit(post)
            runInAction(() => {
                if (post.id) {
                    let updatedActivity = { ...this.getPost(post.id as number), ...post }
                    this.postRegistry.set(post.id as number, updatedActivity as Post)
                }
            })
        }
        catch (error) {
        }
    }

    private getPost = (id: number) => {
        return this.postRegistry.get(id)
    }

    private setActivity = (a: Post) => {
        this.postRegistry.set(a.id, a);
        console.log(this.groupedPosts)
    }
}