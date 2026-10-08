import React from 'react';

import { useTheme } from '@/shared/hooks/themes/use-theme';
import { CURRENT_THEME } from '@/shared/ui/constants/themes';
import { useLocalSearchParams } from 'expo-router';
import { MotiText } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const theme = useTheme(CURRENT_THEME);
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MotiText style={{ color: "red", fontSize: 40 }}>Aboba {id}</MotiText>
    </SafeAreaView>
  );
}
