import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { SignalRProvider } from '@/shared/api/contexts/signalr/signalr-provider';
import { useTheme } from '@/shared/hooks/themes/use-theme';
import { CURRENT_THEME } from '@/shared/ui/constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

export default function RootLayout() {
  const theme = useTheme(CURRENT_THEME);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } 
    else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  if (isAuthenticated === null) {
    return (<SplashScreen />);
  }

  return (
    <SignalRProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar barStyle={theme.barStyle} backgroundColor={theme.baseBackground} translucent={true} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.baseBackground
            }
          }} />

          <Stack.Screen name="(chat)" options={{
            headerShown: false,
            animation: 'slide_from_bottom',
            contentStyle: {
              backgroundColor: theme.baseBackground
            }
          }} />

          <Stack.Screen name="(auth)" options={{
            headerShown: false,
            animation: 'slide_from_bottom',
            contentStyle: {
              backgroundColor: theme.baseBackground
            }
          }} />

          <Stack.Screen name="modal" options={{
            presentation: 'modal',
            title: 'Modal'
          }} />
        </Stack>
      </GestureHandlerRootView>
    </SignalRProvider>
  );
}
