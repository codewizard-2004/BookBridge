import React from 'react';
import { Text, View } from 'react-native';
import GradientBackground from './GradientBackground';

interface StatProps1{
    index: number;
    icon: string;
    title: string;
    description: string;
}

const Achievement = ({index , icon , title, description}: StatProps1) => {
  return (
    <View className='w-[45%] h-[120px] bg-secondary rounded-xl justify-center items-center'>
        <View className='flex flex-col justify-center items-center absolute top-5 z-10'>
            <Text className='text-5xl'>{icon}</Text>
            <Text className='text-sm text-gray-400'>{title}</Text>
            <Text className='text-[10px]  ml-3 text-gray-400'>{description}</Text>
        </View>
        <GradientBackground/>
    </View>
  )
}

export default Achievement