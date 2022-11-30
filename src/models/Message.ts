import { ContentType, MessageType } from "./enums";
import { User } from './User';

export interface Message {
    id: string;
    content: string;
    contentType: ContentType;
    timestamp: number;
    sender: User;
    type: MessageType;
}