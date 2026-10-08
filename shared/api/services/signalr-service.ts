import * as signalR from "@microsoft/signalr";
import { HUB_URL } from "../api";

type ConnectionState =
    | "connecting"
    | "connected"
    | "disconnected"
    | "reconnecting";

type ConnectionCallbacks = {
    onStateChange?: (state: ConnectionState) => void;
    onError?: (error: Error) => void;
};

class SignalRService {
    private connection: signalR.HubConnection | null = null;
    private connectionPromise: Promise<void> | null = null;
    private callbacks: ConnectionCallbacks = {};
    private readonly hubUrl: string;

    constructor(hubUrl: string) {
        this.hubUrl = hubUrl;
    }

    public setCallbacks(callbacks: ConnectionCallbacks): void {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    public async start(): Promise<void> {
        if (this.connection?.state === signalR.HubConnectionState.Connected) {
            return Promise.resolve();
        }

        if (this.connectionPromise) {
            return this.connectionPromise;
        }

        this.callbacks.onStateChange?.("connecting");

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl, {
                transport: signalR.HttpTransportType.WebSockets,
                skipNegotiation: true,
            })
            .withAutomaticReconnect([5000, 5000, 5000, 5000, 5000])
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.onreconnecting((error) => {
            console.warn("SignalR reconnecting", error);
            this.callbacks.onStateChange?.("reconnecting");
        });

        this.connection.onreconnected((connectionId) => {
            console.log("SignalR reconnected", connectionId);
            this.callbacks.onStateChange?.("connected");
        });

        this.connection.onclose((error) => {
            console.warn("SignalR connection closed", error);
            this.connectionPromise = null;
            this.callbacks.onStateChange?.("disconnected");
            if (error) {
                this.callbacks.onError?.(error);
            }
        });

        this.connectionPromise = this.connection
            .start()
            .then(() => {
                console.log("SignalR Connected");
                this.callbacks.onStateChange?.("connected");
            })
            .catch((err) => {
                console.error("SignalR Connection Error", err);
                this.connectionPromise = null;
                this.callbacks.onStateChange?.("disconnected");
                this.callbacks.onError?.(err);
                throw err;
            });

        return this.connectionPromise;
    }

    public async invoke<T>(methodName: string, ...args: any[]): Promise<T> {
        if (!this.connectionPromise) {
            await this.start();
        }

        await this.waitForConnection();

        if (this.connection?.state === signalR.HubConnectionState.Connected) {
            return await this.connection.invoke(methodName, ...args);
        } else {
            throw new Error("Не удалось установить соединение с SignalR");
        }
    }

    public async subscribe<T>(
        methodName: string,
        callback: (response: T) => void,
    ): Promise<void> {
        if (!this.connectionPromise) {
            await this.start();
        }

        await this.waitForConnection();

        if (this.connection?.state === signalR.HubConnectionState.Connected) {
            return this.connection.on(methodName, (response) =>
                callback(response),
            );
        } else {
            throw new Error("Не удалось установить соединение с SignalR");
        }
    }

    private async waitForConnection(timeoutMs: number = 5000): Promise<void> {
        if (this.connection?.state === signalR.HubConnectionState.Connected) {
            return;
        }

        return new Promise((resolve, reject) => {
            const startTime = Date.now();

            const checkInterval = setInterval(() => {
                if (
                    this.connection?.state ===
                    signalR.HubConnectionState.Connected
                ) {
                    clearInterval(checkInterval);
                    resolve();
                } else if (Date.now() - startTime > timeoutMs) {
                    clearInterval(checkInterval);
                    reject(new Error("Timeout waiting for SignalR connection"));
                }
            }, 100);
        });
    }

    public getState(): ConnectionState {
        switch (this.connection?.state) {
            case signalR.HubConnectionState.Connecting:
                return "connecting";
            case signalR.HubConnectionState.Connected:
                return "connected";
            case signalR.HubConnectionState.Reconnecting:
                return "reconnecting";
            default:
                return "disconnected";
        }
    }

    public async stop(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
            this.connection = null;
            this.connectionPromise = null;
            this.callbacks.onStateChange?.("disconnected");
        }
    }
}

export const signalRService = new SignalRService(HUB_URL);
