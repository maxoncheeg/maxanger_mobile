import Chat from '@/entities/ui/chat'
import { useChats } from '@/features/chats/get_chats'
import { useTheme } from '@/shared/hooks/themes/use-theme'
import { CURRENT_THEME } from '@/shared/ui/constants/themes'
import { router } from 'expo-router'
import { MotiView } from 'moti'
import React, { useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView } from 'react-native'
import { LinearTransition } from 'react-native-reanimated'

export default function ChatScreen() {
  const theme = useTheme(CURRENT_THEME)
  const { chats, loadNextPage } = useChats(15);

  const [contentHeight, setContentHeight] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false }); // false → без анимации при старте
  }, [chats]);


  const openChat = (chatId: number) => {
    router.push(`/(chat)/${chatId}`)
  }

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize, } = event.nativeEvent;

    // layoutMeasurement.height — высота видимой области
    // contentOffset.y — текущая позиция скролла
    // contentSize.height — полная высота контента

    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10; // 20px — порог срабатывания

    if (isCloseToBottom && contentHeight > 0) {
      console.log('Достигнут конец списка!');
      loadNextPage()
    }
  };

  return (
    <MotiView
      layout={LinearTransition.springify(3000)}
      style={{
        flex: 1,
        borderRadius: 16,
        marginVertical: 15,
        marginTop: 5,
      }}>
      <ScrollView
        style={{ flex: 1 }}
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', paddingBottom: 20, flexDirection: 'column' }}
        showsVerticalScrollIndicator={true}
        onScrollEndDrag={handleScroll}
        scrollEventThrottle={16} // Оптимизация: ~60 FPS
        onContentSizeChange={(w, h) => setContentHeight(h)}
      >
        {chats.map((value) => {
          return <Pressable key={value.id} onPress={() => openChat(value.id)}>
            <Chat chat={value} />
          </Pressable>

        })}
      </ScrollView>

    </MotiView >
  )
}
