import { User } from "./user";
import { NotificationType } from "./NotificationType";
import { Post } from "./post";
export interface Notification {
    id: number;
    createdDate: Date,
    fromUser: User
    fromUserId: string
    toUser: User
    toUserId: string
    post: Post
    postId: number
    notificationType: NotificationType
    notificationTypeId: number
}
export interface NotificationDto {
    id: number;
    createdDate: Date,
    fromUserName: string
    fromUserImage: string
    notificationTypeName: string
}