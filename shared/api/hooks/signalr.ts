import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import { useEffect, useRef } from "react";

export const useSignalR = (url: string) => {
    const connectionRef = useRef<HubConnection | null>(null);

    useEffect(() => {
        if (connectionRef.current) return;
        console.log(url);
        const conn = new HubConnectionBuilder()
            .withUrl(url)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        connectionRef.current = conn;

        conn.start()
            .then(() => console.log("SignalR connected"))
            .catch((err) => console.error("SignalR start error:", err));

        // return () => {
        //     const current = connectionRef.current;
        //     connectionRef.current = null;
        //     if (current) {
        //         console.log("STOPPING");
        //         current.stop().catch(console.error);
        //     }
        //     console.log("AFTER STOPPING");
        // };
    }, [url]);

    const invoke = (
        methodName: string,
        thenHandler: (...args: any[]) => void,
        ...args: any[]
    ) => {
        connectionRef.current
            ?.invoke(methodName, ...args)
            .then(thenHandler)
            .catch(console.error);
    };

    const on = (eventName: string, handler: (...args: any[]) => void) => {
        connectionRef.current?.on(eventName, handler);
    };

    const off = (eventName: string, handler: (...args: any[]) => void) => {
        connectionRef.current?.off(eventName, handler);
    };

    return { invoke, on, off };
};
