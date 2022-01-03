import { User } from "./user";

export interface Profile{
    userName: string;
    dsiplayName:string;
    image? :string;
    bio?: string
}
export class Profile implements Profile{
    constructor(user :User) {
       this.userName = user.userName
       this.dsiplayName = user.dsiplayName
       this.image = user.image
    }
}
