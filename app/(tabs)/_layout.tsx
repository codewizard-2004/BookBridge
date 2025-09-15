import { router, Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { useAuth } from '@/contexts/AuthContext';
import { Bookmark, Home, LibraryBig, User } from 'lucide-react-native';


type TabIconProps = {
  Icon: React.ComponentType<{ color: string; size?: number }>;
  text: string;
  focused: boolean;
};

const TabIcon = ({ Icon, text,  focused }: TabIconProps) => {
  const color = focused ? '#F07900' : '#B0B0B0';

  return (
    <View className='w-full h-full justify-center items-center flex flex-col'>
      <Icon color={color} size={24} />
      {focused &&(
        <Text className='text-primary' style={{fontSize:8}}>{text}</Text>
      )}
    </View>
    
  );
};

const TopNavigator = () =>{
  return (
    <View className='flex w-full bg-red-500'>
      
    </View>
  )
}

const _layout = () => {
  const { user } = useAuth()
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height:"100%",
          justifyContent:"center",
          marginTop:6,
        },
        tabBarStyle: {
          backgroundColor: "#2A2A2A",
          borderRadius: 50,
          marginRight: 30,
          marginLeft: 30,
          marginHorizontal: 10,
          marginBottom: 36,
          height: 52,
          position:"absolute",
          bottom: -5,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#444444",
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} text='Home' Icon={Home} />
          )
        }}
      />

      <Tabs.Screen
        name='books'
        options={{
          title: "Your Books",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} text='Library' Icon={LibraryBig} />
          )
        }}
      />

      <Tabs.Screen
        name='saved'
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} text='Saved' Icon={Bookmark} />
          )
        }}
      />

    <Tabs.Screen
      name='profile'
      options={{
        href: null,
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} text='Profile' Icon={User} />
        )
      }}
      listeners={{
        tabPress: (e) => {
          e.preventDefault(); // Prevent default tab behavior
          // Make sure to import 'router' from 'expo-router' at the top if not already
          // import { router } from 'expo-router';
          router.push({ pathname: "/(tabs)/profile", params: { userId: user?.id } }) // Navigate explicitly to *your* profile
        },
      }}
    />

    </Tabs>
  )
}

export default _layout