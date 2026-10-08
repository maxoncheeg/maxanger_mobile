import { useTheme } from '@/shared/hooks/themes/use-theme'
import { CURRENT_THEME } from '@/shared/ui/constants/themes'
import Icon from '@/shared/ui/icons/icon'
import { Q } from '@nozbe/watermelondb'
import { MotiView } from 'moti'
import React, { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FadeIn } from 'react-native-reanimated'

export default function NotesScreen() {
  const theme = useTheme(CURRENT_THEME)

  const [content, setContent] = useState<string>("");
  const [input, setInput] = useState<string>("");

  return (
    <MotiView
      entering={FadeIn.springify(3000)}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name='Wrench' size={50} color={theme.extraColor} />
      <Text style={{ fontSize: 30, color: theme.extraColor }}>[В_РАЗРАБОТКЕ]</Text>

      <View style={{ flexDirection: "column", justifyContent: "center", gap: 10 }}>

          <View style={{
            backgroundColor: theme.activeBackground,
            height: 50,
            width: 100,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: "center"
          }}>
            <Text style={{ color: theme.activeColor }}>ADD</Text>
          </View>

          <View style={{
            backgroundColor: theme.activeBackground,
            height: 50,
            width: 100,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: "center"
          }}>
            <Text style={{ color: theme.activeColor }}>SHOW</Text>
          </View>

        <Text style={{ color: theme.baseColor, fontSize: 20 }}>{content}</Text>
      </View>
    </MotiView>
  )
}