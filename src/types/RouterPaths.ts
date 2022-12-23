export enum AuthenticatedPaths {
  CHATS = "/chats/",
  USERINFO = "/userinfo/",
  CLIENT = "/client/",
  FRIENDS = "/friends/",
  ORDER = "/order/",
  COMPANY = "/company/",
  FILE = "/file/",
  CHAT = "/chat/",
}

export enum UnAuthenticatedPaths {
  LOGIN = "/login",
  REGISTER = "/register",
}

export const RouterPathsKeys = {
  ...AuthenticatedPaths,
  ...UnAuthenticatedPaths,
};

export type RouterPaths = AuthenticatedPaths | UnAuthenticatedPaths;
