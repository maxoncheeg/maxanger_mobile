// src/app/providers/SignalRProvider/SignalRProvider.tsx

import { signalRService } from '@/shared/api/services/signalr-service';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { SignalRContext } from './signalr-context';

interface SignalRProviderProps {
  children: ReactNode;
}

export const SignalRProvider = ({ children }: SignalRProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    signalRService.setCallbacks({
      onStateChange: (state) => {
        console.log('Connection state changed:', state);
        setIsConnecting(state === 'connecting' || state === 'reconnecting');
        setIsConnected(state === 'connected');
      },
      onError: (error) => {
        console.error('SignalR error:', error);
        setIsConnected(false);
        setIsConnecting(false);
      }
    });

    const initConnection = async () => {
      try {
        await signalRService.start();
      } catch (err) {
        console.error('SignalR connection error:', err);
      }
    };

    initConnection();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        if (signalRService.getState() !== 'connected') {
          signalRService.start();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SignalRContext.Provider value={{ isConnected, isConnecting, invoke: signalRService.invoke, subscribe: signalRService.subscribe }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalR must be used within SignalRProvider');
  }
  return context;
};