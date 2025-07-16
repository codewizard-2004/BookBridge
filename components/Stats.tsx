import React from 'react';
import { Text, View } from 'react-native';

interface StatProps1{
    value: number;
    text1: string;
    text2: string;
}

const Stats = ({value , text1 , text2}: StatProps1) => {
  return (
    <View className='w-[47%] h-[120px] bg-secondary rounded-xl justify-center items-center'>
        <Text className='font-semibold text-primary text-3xl'>{value}</Text>
        <Text className='font-semibold text-white text-xl'>{text1}</Text>
        <Text className='text-sm text-gray-400'>{text2}</Text>
    </View>
  )
}

export default Stats