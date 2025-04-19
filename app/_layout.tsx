import { Stack } from "expo-router"; 
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '../Context/themeContext.js'
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

function LayoutContent() {
  const { theme } = useTheme();

  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar style={theme.statusBar} backgroundColor={theme.background} />
      <Stack screenOptions={{
        headerShown: false,
        navigationBarColor: theme.background,
        statusBarColor: theme.background,
      }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
    
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
    <SafeAreaProvider>
      <ThemeProvider>
        <LayoutContent />
      </ThemeProvider>
    </SafeAreaProvider>
    </ClerkProvider>
  );
}
