import TopNavigator from "@/components/TopNavigator";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './globals.css';

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="bg-background" style={{ flex: 1, backgroundColor: "black" }}>

      <Stack
        
      >
        <Stack.Screen 
          name="(tabs)"
          options={{
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
      </Stack>
    </GestureHandlerRootView>
  );
}
