export interface Friend {
  id: string,
  nick: string,
  firstName: string,
  lastName: string,
}

export interface Conversation {
  id: string;
  name: string;
  active: boolean;
  lastMessage?: Message;
  participants: Friend[];
  convDetails?: ConvChatDto
}


export interface Message {
  id?: string;
  ownerId?: string;
  nick: string;
  content: string;
  sendTime: Date;
  noticed?: boolean;
}

export interface UserChatData {
  id: string;
  nick: string;
}


export interface ConversationAdd {
  name: string;
  userID: string;
  participants: Friend[];
}

export interface ConvResponseDTO {
  id: string;
  name: string;
  createdAt: Date;
  isSilenced: boolean
  chatPhoto: string
  nicks: string[]
  theme: string
  isFavourite: boolean
  messages: SimpleMessageDTO[];
  participants: UserChatData[]
}

export interface ConvChatDto {
  id: string;
  name: string;
  createdAt: Date;
  isSilenced: boolean
  chatPhoto: string
  nicks: string[]
  theme: string
  isFavourite: boolean
  messages: MessageConvDTO[];
  participants: UserChatData[]
}

export interface MessageConvDTO {
  id: string;
  nick: string;
  content: string;
  sendTime: Date;
}

export interface ActivationMessage {
  active: boolean;
  convID: string;
}

export interface SimpleMessageDTO {
  id: string;
  nick: string;
  content: string;
  sendTime: Date;
}