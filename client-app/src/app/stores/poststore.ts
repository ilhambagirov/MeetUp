import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { PaginatedResult, Pagination, PagingParams } from "../models/pagination";
import { Post, PostFormValues } from "../models/post";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { dark } from "./store";

export default class PostStore {
    postRegistry = new Map<number, Post>();
    editMode = 0
    postDrop = 0
    addPhotoMode = false
    pagination: Pagination | null = null
    pagingParams = new PagingParams()
    loading = false
    constructor() {
        makeAutoObservable(this)
    }

    updateLike = async (postId: number, liking: boolean, username: string) => {
        try {
            await agent.Like.like(postId)
            var post = this.postRegistry.get(postId)
            runInAction(() => {
                liking ? post.likeCount-- : post.likeCount++
                post.liking = !post.liking
                if (window.location.pathname.includes('userprofile')) {
                    var user = dark.profileStore.loadProfile(username)
                    var u = user as unknown as User
                    liking ? u.likesCount-- : u.likesCount++
                }
            })
        } catch (error) {
            throw error
        }
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
    // setLoadingNext(bool: boolean) {
    //     runInAction(() => this.loadingNext = bool)
    // }

    setAddPhotoMode = (bool: boolean) => {
        runInAction(() => {
            this.addPhotoMode = bool
        })
    }

    setEditMode = (id: number) => {
        runInAction(() => {
            this.editMode = id
        })
    }
    setPostDropDown = (id: number) => {
        runInAction(() => {
            this.postDrop = id
        })
    }

    loadActivities = async () => {
        try {
            this.setPagingParams(new PagingParams(1, 5))
            console.log(this.pagingParams)
            const result = await agent.Posts.list(this.axiosParams);
            this.postRegistry.clear()
            result.data.forEach(a => {
                this.setActivity(a)
            })
            this.setPagination(result.pagination)
        } catch (error) {
            console.log(error)
        }
    }
    loadActivitiesPagination = async () => {
        try {
            setTimeout(async () => {
                const result = await agent.Posts.list(this.axiosParams);
                result.data.forEach(a => {
                    this.setActivity(a)
                })
                this.setPagination(result.pagination)
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }

    setPagination(pagination: Pagination) {
        this.pagination = pagination
    }

    get groupedPosts() {
        var result = Array.from(this.postRegistry, ([id, value]) => ({ id, value }))
            .sort(function (a, b) {
                var dateA = new Date(a.value.createdDate).getTime();
                var dateB = new Date(b.value.createdDate).getTime();
                return dateA < dateB ? 1 : -1
            });
        return result
    }
    deletePost = async (id: number) => {
        try {
            const post = await agent.Posts.delete(id);
            runInAction(() => {
                this.postRegistry.delete(id)
            })
            var profile = dark.profileStore.profile as User
            profile.posts.length--
        } catch (error) {
            console.log(error)
        }
    }
    createActivity = async (post: PostFormValues) => {
        runInAction(() => this.loading = true)
        const user = dark.userStore.user
        const createdUser = new Profile(user! as User)
        try {
            var createdPost = await agent.Posts.create(post).then(result => result.data)
            setTimeout(() => {
                createdPost.createdByUser = createdUser
                this.setActivity(createdPost)
                if (window.location.pathname.includes('userprofile')) {
                    var profile = dark.profileStore.profile as User
                    profile.posts.length++
                }
            }, 1000);
            runInAction(() => this.loading = false)
        }
        catch (error) {
            console.log(error)
            runInAction(() => this.loading = false)
        }

    }
    // getUser = async () => {
    //     try {
    //         const user = await agent.Account.Current()
    //         runInAction(() => this.user = user)
    //         this.postRegistry.clear()
    //         user.posts?.forEach((a: Post) => this.setActivity(a))

    //         return user
    //     } catch (error) {
    //         throw error
    //     }
    // }

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

    setActivity = (a: Post) => {
        this.postRegistry.set(a.id, a);
    }

    // updatePostUserFollowing = (username: string) => {
    //     this.postRegistry.forEach(post => {
    //         if (post.createdByUser?.userName === username) {
    //             post.createdByUser.following = !post.createdByUser.following
    //         }
    //     })
    // }
}