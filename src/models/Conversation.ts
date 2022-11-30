import { Message } from './Message';
import { User } from './User';

export interface Conversation {
  id: string;
  isGroup: boolean;
  groupName?: string;
  participants: User[];
  messages: Message[];
}