import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useColorScheme } from '~/hooks/useColorScheme.web';
import { Colors } from '~/constants/Colors';
import { Compass, Home } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();



  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          marginBottom: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="[subdomain]"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24}  color={color} />,
        }}
      />
      <Tabs.Screen
        name="p/[slug]"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => <Compass size={24}  color={color} />,
        }}
      />
  
    </Tabs>
  );
}