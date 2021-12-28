import { Post } from "./post";
import { Profile } from "./profile";
export interface User {
    id: string
    userName: string,
    dsiplayName: string,
    token: string,
    email: string,
    phoneNumber?: string,
    bio?: string,
    image?: string,
    school?: string,
    university?: string,
    academicDegree?: string,
    profession?: string,
    posts?: Post[] 
}
export interface UserFormValues {
    email: string,
    dsiplayName?: string,
    password?: string,
    userName?: string,
    phoneNumber?: string,
    bio?: string,
    image?: string,
    school?: string,
    university?: string,
    academicDegree?: string,
    profession?: string,
}