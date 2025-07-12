import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

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
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} text='Profile' Icon={User} />
          )
        }}
      />

    </Tabs>
  )
}

export default _layout