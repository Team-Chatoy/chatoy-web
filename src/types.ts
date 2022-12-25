import { Dayjs } from "dayjs";

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
