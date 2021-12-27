import { Post } from "./post";
import { Profile } from "./profile";
export interface User {
    id: string
    userName: string,
    dsiplayName: string,
    token: string,
    email: string,
    phoneNumber: string,
    bio: string,
    image?: string,
    School?: string,
    university?: string,
    academicDegree?: string,
    profession?: string,
    posts?: Post[] 
}

export interface UserFormValues {
    email: string,
    displayName?: string,
    password: string,
    userName?: string,
}