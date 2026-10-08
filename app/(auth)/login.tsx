import React from 'react';

import { useTheme } from '@/shared/hooks/themes/use-theme';
import { CURRENT_THEME } from '@/shared/ui/constants/themes';
import { MotiText } from 'moti';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLogin() {
  const theme = useTheme(CURRENT_THEME);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MotiText style={{ color: "red", fontSize: 40 }}>Aboba</MotiText>
    </SafeAreaView>
  );
}
