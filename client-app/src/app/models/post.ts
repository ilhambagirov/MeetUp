import { PostComment } from "./comment";
import { Profile } from "./profile";


export interface Post {
    id: number;
    title: string,
    filePath?: any,
    createdDate : Date,
    createdByUser: Profile
    createdByUserId: string
    liking : boolean
    likeCount: number
    comments : PostComment[]
}

export class Post implements Post {

    constructor(init?: PostFormValues) {
        Object.assign(this, init)
    }
}

export class PostFormValues {
    id?:number | string
    title: string = '';
    filePath?: any
    constructor(activity?: PostFormValues) {
        if (activity) {
            this.id = activity?.id
            this.title = activity?.title
            this.filePath = activity?.filePath
        }

    }
}