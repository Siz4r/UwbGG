import {Message, UserChatData} from "../../core/components/types";
import {Friend} from "../Friends/types";

export interface Conversation {
  id: string;
  name: string;
  active: boolean;
  lastMessage?: Message;
  participants: Friend[];
}

export interface ConversationAdd {
  name: string;
  userID: string;
  participants: Friend[];
}

export interface ConvResponseDTO {
  id: string;
  name: string;
  messages: SimpleMessageDTO[];
  participants: UserChatData[]
}

export interface ConvChatDto {
  id: string;
  name: string;
  messages: MessageConvDTO[];
  participants: UserChatData[]
}

export interface AddParticipantDTO {
  convID: string,
  userID: string
}

export interface MessageConvDTO {
  id: string;
  ownerId: string;
  nick: string;
  content: string;
  imageURL: string
  sendTime: Date;
}

export interface ActivationMessage {
  active: boolean;
  convID: string;
}

export interface SimpleMessageDTO {
  id: string;
  ownerId: string;
  nick: string;
  content: string;
  imageRawData: number[]
  sendTime: Date;
}

export interface MessageResponseDTO {
  simpleMessage: boolean;
  data: SimpleMessageDTO;
  activationMessage: ActivationMessage;
}

export interface MessageCreateDTO {
  content: string;
  convID: string;
  file?: File;
}