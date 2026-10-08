export interface LastMessage {
    id: number;
    fromId: number;
    replyToMessageId?: number | undefined;
    chatId: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    metadata: Record<string, any> | null;
    username: string;
}

export interface Message {
    id: number;
    fromId: number;
    replyToMessageId?: number | undefined;
    chatId: number;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    metadata: Record<string, any> | null;
}

export interface MessagesResponse{
    
}
