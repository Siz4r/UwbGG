import { Conversation } from "../Conversations/types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  nick?: string;
  convs?: Conversation[];
  friends?: User[];
  role: string;
}

export interface ApiUser {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  nick?: string;
  convs?: Conversation[];
  friends?: User[];
}

export interface ApiTokenResponse {
  accessToken: string;
  tokenType: string;
}

export interface ApiAuthenticationResponse extends ApiTokenResponse {
  user: User;
}

export interface ApiRegister {
  firstName: string;
  lastName: string;
  nick: string;
  password: string;
  email: string;
}

export interface UserEditData {
  firstName: string;
  lastName: string;
  nick: string;
  email: string;
}

export interface NewPassword {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface UserSearchDTO {
  id: string,
  nick: string
}
