import { useTheme } from '@/shared/hooks/themes/use-theme'
import { CURRENT_THEME } from '@/shared/ui/constants/themes'
import Icon from '@/shared/ui/icons/icon'
import { MotiView } from 'moti'
import React from 'react'
import { Text } from 'react-native'
import { FadeIn } from 'react-native-reanimated'

export default function ProfileScreen() {
  const theme = useTheme(CURRENT_THEME)

  return (
    <MotiView
      entering={FadeIn.springify(3000)}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name='Wrench' size={50} color={theme.extraColor} />
      <Text style={{ fontSize: 30, color: theme.extraColor }}>[В_РАЗРАБОТКЕ]</Text>
    </MotiView>
  )
}
