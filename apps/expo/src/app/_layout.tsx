import "@bacons/text-decoder/install";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { cssInterop, useColorScheme } from "nativewind";



import "../styles.css";
import ConvexClientProvider from "./convex-client-provider";
import { Colors } from "~/constants/Colors";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { ThemeToggle } from "~/components/ThemeToggle";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

cssInterop(SafeAreaView, { className: "style" });

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";

const NAV_THEME = {
  light: {
    background: 'hsl(0 0% 100%)', // background
    border: 'hsl(240 5.9% 90%)', // border
    card: 'hsl(0 0% 100%)', // card
    notification: 'hsl(0 84.2% 60.2%)', // destructive
    primary: 'hsl(240 5.9% 10%)', // primary
    text: 'hsl(240 10% 3.9%)', // foreground
  },
  dark: {
    background: 'hsl(240 10% 3.9%)', // background
    border: 'hsl(240 3.7% 15.9%)', // border
    card: 'hsl(240 10% 3.9%)', // card
    notification: 'hsl(0 72% 51%)', // destructive
    primary: 'hsl(0 0% 98%)', // primary
    text: 'hsl(0 0% 98%)', // foreground
  },
};

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const { colorScheme } = useColorScheme();
  const [loaded, error] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ConvexClientProvider>

      <ThemeProvider value={colorScheme === "dark" ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={colorScheme}/>

      <Stack
        screenOptions={{
          // header: () => <Header/>,
          headerStyle: {
            backgroundColor: Colors[colorScheme ?? "dark"].background,
          },
          contentStyle: {
            backgroundColor: colorScheme == "dark" ? "#09090B" : "#FFFFFF",
          },
        }}
      >
         <Stack.Screen
          name='(app)'
          options={{
            headerShown: true,
            title:"",
            headerLeft: () =>  <ThemeToggle />,
            // headerRight: () => <AuthAvatar />,
          }}
        />

          <Stack.Screen
          name='(hub)'
          options={{
            headerShown: true,
            title:"",
            headerLeft: () =>  <ThemeToggle />,
            // headerRight: () => <AuthAvatar />,
          }}
        />


      </Stack>
      </ThemeProvider>
      </ConvexClientProvider>
  );
}
