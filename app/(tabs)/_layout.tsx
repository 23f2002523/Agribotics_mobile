import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={() => null}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="farm" 
        options={{
          title: 'My Crops',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="spa" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="explore" 
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="storefront" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="ai-assistant"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen 
        name="settings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen 
        name="contact"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen 
        name="about"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen 
        name="login"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen 
        name="register"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen 
        name="soil_testing"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

