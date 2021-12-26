import { User } from "./user";

export interface Profile{
    username: string;
    dsiplayName:string;
    image? :string;
    bio?: string
}

export class Profile implements Profile{
    constructor(user :User) {
       this.username = user.userName
       this.dsiplayName = user.dsiplayName
       this.image = user.image
    }
}
