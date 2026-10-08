import { LastMessage } from "./messages";

export interface ChatInfo {
    id: number;
    name?: string;
    type: string;
    lastMessage?: LastMessage;
}
