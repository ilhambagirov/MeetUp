import { Profile } from "./profile";
import { User } from "./user";

export interface Message {
    id: number;
    messageText: string,
    createdDate : Date,
    sender: User
    receiver: User
    senderId: string
    receiverId: string
}