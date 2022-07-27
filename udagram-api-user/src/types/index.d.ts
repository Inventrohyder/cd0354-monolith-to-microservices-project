import { IncomingMessage } from "http";
export interface IGetIdInfoHttpMessage extends IncomingMessage {
  id: string;
}