import { Post } from "./post";
import { Photo, Profile } from "./profile";
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
    photos? : Photo[]
    following : boolean
    followersCount : number
    followingCount : number
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