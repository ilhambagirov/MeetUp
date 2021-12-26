import { Post } from "./post";
import { Profile } from "./profile";

export interface User {
    userName: string,
    dsiplayName: string,
    token: string,
    image?: string,
    posts?: Post[] 

}

export interface UserFormValues {
    email: string,
    displayName?: string,
    password: string,
    userName?: string,
}