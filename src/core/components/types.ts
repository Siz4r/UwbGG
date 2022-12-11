export interface Message {
  id?: string;
  ownerId?: string;
  nick: string;
  content: string;
  sendTime: Date;
  noticed?: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  isActive: boolean;
  lastMessage: Message;
}

export interface UserChatData {
  id: string;
  nick: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  nick?: string;
  convs?: Conversation[];
  friends?: UserData[];
}

export type ChatRowEntity = UserData | Conversation;
