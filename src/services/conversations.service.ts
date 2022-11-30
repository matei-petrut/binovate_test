import { Conversation } from "../models";
import { addItemToLocalStorage, getItemFromLocalStorage } from "../utils";

const CONVERSATIONS_KEY = 'conversations';
const LAST_OPEN_CONVERSATION_KEY = 'last_open_conversation';

export class ConversationsService {
  getAllConversations() {
    const conversations = getItemFromLocalStorage(CONVERSATIONS_KEY);
    return conversations ? JSON.parse(conversations) : [];
  }

  persistConversations(conversations: Conversation[]) {
    addItemToLocalStorage(CONVERSATIONS_KEY, JSON.stringify(conversations));
  }

  getLastOpenConversation() {
    const lastOpenConversations = getItemFromLocalStorage(LAST_OPEN_CONVERSATION_KEY);
    return lastOpenConversations ? JSON.parse(lastOpenConversations) : undefined;
  }

  persistLastOpenConversation(conversation?: Conversation) {
    if (!conversation) {
      return;
    }

    addItemToLocalStorage(LAST_OPEN_CONVERSATION_KEY, JSON.stringify(conversation));
  }
}