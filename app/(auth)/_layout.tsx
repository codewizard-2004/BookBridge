import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          title: "Login"
        }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          headerShown: false,
          title: "Sign Up"
        }} 
      />
      <Stack.Screen 
        name="genre"
        options={{
          headerShown: false,
          title: "Select Genre"
        }}/>
      <Stack.Screen 
        name="avatar"
        options={{
          headerShown: false,
          title: "Select an Avatar"
        }}/>
    </Stack>
  );
}
