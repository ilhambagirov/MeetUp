import { Profile } from "./profile";

export interface Post {
    id: number;
    title: string,
    image?: string,
    createdDate : Date,
    createdByUser: Profile
}