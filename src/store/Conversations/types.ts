import { Message } from "../../core/components/types";
import { User } from "../Users/types";

export interface Conversation {
  id: string;
  name: string;
  isActive: boolean;
  lastMessage?: Message;
  participants: User[];
}

export interface ConversationAdd {
  name: string;
  participants: User[];
}
