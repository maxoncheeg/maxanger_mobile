import { ChatInfo } from "@/entities/models/chats";
import { SignalRContext } from "@/shared/api/contexts/signalr/signalr-context";
import { signalRService } from "@/shared/api/services/signalr-service";
import { useContext, useEffect, useState } from "react";

export const useChats = (pageSize: number) => {
    const [messages, setMessages] = useState<ChatInfo[]>([]);
    const [page, setPage] = useState<number>(0);
    const [lastMessagesCount, setLastMessagesCount] = useState<number>(0);
    const signal = useContext(SignalRContext);

    useEffect(() => {
        const getChats = async () => {
            if (!signal.isConnected) return;

            console.log("START UPDATE Messages");

            let date = new Date(2004, 1);
            let response = await signalRService.invoke<Message[]>(
                "getMessages",
                {
                    page: page,
                    pageSize: pageSize,
                    lastUpdatedTime: date,
                },
            );
            setLastChatsCount(response.length);
            setChats((prev) => [...prev, ...response]);
            console.log(response);
        };

        getChats();
    }, [page, pageSize, signal.isConnected]);

    const loadNextPage = () => {
        if (lastChatsCount < pageSize) return;

        console.log(page);
        setPage(page + 1);
    };

    return { chats, loadNextPage };
};
