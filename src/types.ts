import { Dayjs } from "dayjs";

export interface IUser {
  id: number;
  username: string;
  nickname: string;
  slogan: string;
  status: 0 | 1 | 2;
  registered: Dayjs;
}

export interface IRoom {
  id: number;
  name: string;
  description: string;
  created: Dayjs;
}

export interface ITextMessage {
  type: "Text";
  text: string;
}

export type MessageContent = ITextMessage;

export interface IMessage {
  uuid: string;
  sender: number;
  room: number;
  data: MessageContent;
  sent: Dayjs;
  modified: boolean;
}

export interface IWsAuth {
  type: "Auth";
  code: number;
  msg: string;
}

export interface IWsMsg {
  type: "Recv";
  data: IMessage;
}

export type WsData = IWsAuth | IWsMsg;
