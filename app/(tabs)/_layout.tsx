import React, { useState } from 'react';
import { MaxangerTabs, TabItem } from '../../shared/ui/components/tabs';

import ChatScreen from '@/pages/chats';
import NotesScreen from '@/pages/notes';
import PeopleScreen from '@/pages/people';
import ProfileScreen from '@/pages/profile';
import TerminalScreen from '@/pages/terminal';
import { useTheme } from '@/shared/hooks/themes/use-theme';
import { CURRENT_THEME } from '@/shared/ui/constants/themes';
import { ServerConnection } from '@/widgets/connection';
import { MotiView } from 'moti';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

export default function TabLayout() {
  const theme = useTheme(CURRENT_THEME);
  const [tabIndex, setTabIndex] = useState(2);

  const tabsInfo: TabItem[] = [
    { icon: "BookText", name: "[ЗАМЕТКИ]" },
    { icon: "Terminal", name: "[TERMINAL]" },
    { icon: "MessageSquare", name: "[ЧАТЫ]" },
    { icon: "UserSearch", name: "[ЛЮДИ]" },
    { icon: "User", name: "[ПРОФИЛЬ]" },
  ]


  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onEnd((e) => {
      if (Math.abs(e.translationX) < 50) return;

      if (tabIndex > 0 && e.translationX > 80) {
        scheduleOnRN(setTabIndex, tabIndex - 1);
      } else if (tabIndex < tabsInfo.length - 1 && (e.translationX < -80)) {
        scheduleOnRN(setTabIndex, tabIndex + 1);
      }
    })

  const onTabChange = (index: number) => {
    setTabIndex(index)
  }

  return (
    <GestureDetector gesture={swipeGesture}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ margin: 5 }}>
          <MotiView style={{ paddingHorizontal: 10 }}>
            <ServerConnection />
          </MotiView>
        </View>
        <View style={{ margin: 5 }}>
          <MaxangerTabs tabs={tabsInfo} selectedIndex={tabIndex} onChange={onTabChange} />
        </View>
        <MotiView
          style={{ flex: 1, marginHorizontal: 15 }}
        >

          {tabIndex === 0 && <NotesScreen />}
          {tabIndex === 1 && <TerminalScreen />}
          {tabIndex === 2 && <ChatScreen />}
          {tabIndex === 3 && <PeopleScreen />}
          {tabIndex === 4 && <ProfileScreen />}
        </MotiView>
      </SafeAreaView>
    </GestureDetector>
  );
}
