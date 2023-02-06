import { ApiUser, User } from "./types";

export const serializeUser = (apiUser: ApiUser, role: string): User => {
  const { id, firstName, lastName, friends, convs, email, nick } = apiUser;
  return {
    id,
    firstName,
    lastName,
    friends,
    convs,
    email,
    nick,
    role,
  };
};
