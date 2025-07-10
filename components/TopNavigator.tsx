import { useRouter } from 'expo-router';
import { CircleUserRound, Search } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TopNavigator = () => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 pt-12 pb-3 bg-white shadow">
      <View className="flex-row items-center">
        {/* <Image
          source={require('../assets/logo.png')} // 👈 Replace with your logo
          className="w-8 h-8 mr-2"
        /> */}
        <Text className="text-2xl font-bold text-primary">📚 BookBridge</Text>
      </View>
    
        <View className='flex flex-row gap-5'>
          <TouchableOpacity className='bg-accent w-12 h-9 justify-center items-center rounded-full'>
            <Text className='text-orange-500'>🔥5</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Search size={24} color="#1A73E8" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
            <CircleUserRound size={24} color="#1A73E8"/>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default TopNavigator;
