import { Profile } from "./profile";
import { User } from "./user";

export interface Post {
    id: string;
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
    id?: string
    title: string = '';
    constructor(activity?: PostFormValues) {
        if (activity) {
            this.id = activity?.id
            this.title = activity?.title
        }

    }
}