import { Profile } from "./profile";
import { User } from "./user";

export interface Post {
    id: number;
    title: string,
    image?: string,
    createdDate : Date,
    createdByUser: Profile
}

export class Post implements Post {

    constructor(init?: PostFormValues) {
        Object.assign(this, init)
    }
}

export class PostFormValues {
    id?: string = undefined
    title: string = '';
    constructor(activity?: PostFormValues) {
        if (activity) {
            this.id = activity?.id
            this.title = activity?.title
        }

    }
}