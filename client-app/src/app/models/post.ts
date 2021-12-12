import { Profile } from "./profile";
import { User } from "./user";

export interface Post {
    id: number;
    title: string,
    image?: string,
    createdDate : Date,
    createdByUser: Profile
}