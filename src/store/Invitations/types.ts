export interface Invitation {
  id: string;
  nick: string;
  sendDate: Date;
}

export interface SendRequestDTO {
  fromId: string;
  toId: string;
}
