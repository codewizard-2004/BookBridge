import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack>
        <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          title: "Account Settings"
        }} 
      />
      <Stack.Screen 
        name="information" 
        options={{ 
          headerShown: false,
          title: "Account Information"
        }} 
      />
      <Stack.Screen 
        name="change_password" 
        options={{ 
          headerShown: false,
          title: "Change Password"
        }} 
      />
      <Stack.Screen 
        name="delete_account" 
        options={{ 
          headerShown: false,
          title: "Delete Account"
        }} 
      />
    </Stack>
  );
}
