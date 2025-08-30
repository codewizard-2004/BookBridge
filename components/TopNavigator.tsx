import { images } from '@/constants/images';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';
import { CircleUserRound, Search } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const TopNavigator = () => {
  const router = useRouter();
  const avatar = "https://avatar.iran.liara.run/public/18";
  const { userData } = useUser();
  console.log("issue in  topnavigator",userData);

  return (
    <View className="flex-row items-center justify-between px-4 pt-12 pb-3 bg-background shadow">
      <View className="flex-row items-center">
        {/* <Image
          source={require('../assets/logo.png')} // 👈 Replace with your logo
          className="w-8 h-8 mr-2"
        /> */}
        {/* <Text className="text-2xl font-bold text-primary">📚 BookBridge</Text> */}
        <Image  source={images.LOGO} style={{width: 35 , height:35}}/>
        <Text className='text-xl font-semibold ml-2 text-primary'>BOOKBRIDGE</Text>
      </View>
    
        <View className='flex flex-row gap-5'>
          <TouchableOpacity className='bg-accent w-12 h-9 justify-center items-center rounded-full' onPress={() => router.push("/streak")}>
            <Text className='text-white font-semibold'>🔥5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> router.push("/search")}>
            <Search size={24} color="#F07900" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push({ pathname: "/(tabs)/profile", params: { userId: userData?.id } })}>
            {userData?.profile_url?
            <Image source={{uri: userData.profile_url}} style={{ width: 32, height: 32, borderRadius: 16 }} />:
            <CircleUserRound size={24} color="#F07900"/>
            }
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default TopNavigator;
