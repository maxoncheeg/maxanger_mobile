import { createContext } from "react";
import { signalRService } from "../../services/signalr-service";

interface ISignalRContext {
    isConnecting: boolean;
    isConnected: boolean;
    invoke: typeof signalRService.invoke;
    subscribe: typeof signalRService.subscribe;
}

export const SignalRContext = createContext<ISignalRContext>({
    isConnecting: false,
    isConnected: false,
    invoke: signalRService.invoke,
    subscribe: signalRService.subscribe,
});
