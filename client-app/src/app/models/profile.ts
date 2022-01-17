import { User } from "./user";

export interface Profile{
    userName: string;
    dsiplayName:string;
    image? :string;
    bio?: string;
    photos : Photo[]
    following : boolean
}
export class Profile implements Profile{
    constructor(user :User) {
       this.userName = user.userName
       this.dsiplayName = user.dsiplayName
       this.image = user.image
    }
}

export interface Photo{
    id: number;
    url:string;
    isMain? :boolean;
}
