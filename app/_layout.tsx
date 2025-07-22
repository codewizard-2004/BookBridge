import TopNavigator from "@/components/TopNavigator";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './globals.css';
// Import supabase client to ensure polyfill is loaded early
import '@/utils/supabaseClient';

function useProtectedRoute(user: any) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments.length > 0 && (segments[0] as string) === "(auth)";

    // Add a timeout to ensure the component is mounted
    const timeoutId = setTimeout(() => {
      if (!user && !inAuthGroup) {
        // Redirect to the login screen
        router.replace("/(auth)/login" as any);
      } else if (user && inAuthGroup) {
        // Redirect away from the auth screens
        router.replace("/(tabs)");
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [user, segments]);
}

function AppNavigator() {
  const { user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useProtectedRoute(user);

  if (loading || !isMounted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="#F07900" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen 
        name="(auth)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="(settings)" 
        options={{ headerShown: false , title: "Settings" }} 
      />
      <Stack.Screen 
        name="(tabs)"
        options={{
          headerShown: true,
          header: () => <TopNavigator/>
        }}
      />
      <Stack.Screen 
        name="streak/index"
        options={{
          title:"Streak Society",
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="search/index"
        options={{
          title:"Search",
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="privacy/index"
        options={{
          title:"Privacy",
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="friends/index"
        options={{
          title:"Friends",
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="movies/[id]"
        options={{
          title:"Movie",
          headerShown: false
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView className="bg-background" style={{ flex: 1, backgroundColor: "black" }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
