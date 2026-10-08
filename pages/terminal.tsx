import { useTheme } from '@/shared/hooks/themes/use-theme'
import { CURRENT_THEME } from '@/shared/ui/constants/themes'
import { MotiView } from 'moti'
import React, { useEffect, useRef } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { LinearTransition } from 'react-native-reanimated'

export default function TerminalScreen() {
  const theme = useTheme(CURRENT_THEME)
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true }); // false → без анимации при старте
  }, []);

  return (
    <MotiView
      layout={LinearTransition.springify(3000)}
      style={{
        flex: 1,
        backgroundColor: theme.consoleBackground,
        borderRadius: 16,
        marginVertical: 15,
        marginTop: 5,
        paddingHorizontal: 10
      }}>
      <ScrollView
        style={{ flex: 1 }}
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 20, flexDirection: 'column' }}
        showsVerticalScrollIndicator={true}
      >
        {Array.from({ length: 50 }, (_, i) => i + 1).map((index) => {
          return <View key={"c"+index}>
            {index <= 49 ?
              <Text style={{
                color: theme.baseColor,
                margin: 1
              }}>
                {"[USR] >DATABASE DROP"}
              </Text>
              :
              <Text style={{
                color: theme.extraColor,
                margin: 1
              }}>
                {"[SYS] ОШИБКА СИСТЕМЫ"}
              </Text>

            }
          </View>

        })}
      </ScrollView>

      <TextInput
        placeholder='TYPE A COMMAND'
        placeholderTextColor={theme.activeBackground}
        style={{
          
        }}
      ></TextInput>
    </MotiView>
  )
}
