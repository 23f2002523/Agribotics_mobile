import { Tabs } from 'expo-router';
import React from 'react';

import { CustomTabBar } from '@/components/custom-tab-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="farm" />
      <Tabs.Screen name="ai-assistant" />
      <Tabs.Screen name="settings" />
      <Tabs.Screen name="contact" />
      <Tabs.Screen name="about" />
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}

