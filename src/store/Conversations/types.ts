import { Message } from "../../core/components/types";

export interface Conversation {
  id: string;
  name: string;
  isActive: boolean;
  lastMessage: Message;
}
