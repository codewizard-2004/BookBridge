import { CircleUserRound, UserRoundCheck, UserRoundPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface profileProps {
  me? : boolean;
  followed?: boolean
}

const profile = ({me = true , followed = false}) => {
  
  const [selected , setSelected] = useState(followed)
  const avatar = "https://avatar.iran.liara.run/public/18";

  return (
    <View className="bg-background flex-1 flex-col items-center">

      <View className='w-full flex flex-row m-5 items-center gap-20'>
        <View className='flex flex-row ml-5'>
          {avatar?
              <Image source={{uri: avatar}} style={{ width: 60, height: 60, borderRadius: 16 }} />:
              <CircleUserRound size={60} color="#F07900"/>
          }
          <View className='flex flex-col ml-5'>
            <Text className='text-white font-semibold text-2xl'>John Doe</Text>
            <Text className='text-gray-400'>john@example.com</Text>
            <TouchableOpacity>
              <Text className='text-gray-400 text-sm'>3 friends</Text>
            </TouchableOpacity>
          </View>
        </View>
        {!me && !selected && (
          <TouchableOpacity onPress={() => setSelected(!selected)} className='rounded-full justify-center items-center mx-3 my-3 w-[35px] h-[35px] bg-white'>
            <UserRoundPlus size={26} color="black"/>
          </TouchableOpacity>
        )}
        {!me && selected && (
          <TouchableOpacity onPress={() => setSelected(!selected)} className='rounded-full justify-center bg-secondary items-center mx-3 my-3 w-[35px] h-[35px] '>
            <UserRoundCheck size={26} color="white"/>
          </TouchableOpacity>
        )}
      </View>

       {me && (
          <View className='bg-secondary rounded-xl h-[200px] w-[90%] flex flex-col'>
            <Text className='text-primary font-semibold text-2xl m-3'>This weeks goal</Text>
            <View className='flex flex-row m-3'>
              <View className='w-[100px] h-[100px] flex flex-col justify-center items-center rounded-full bg-primary'>
                <Text className='text-white font-semibold text-3xl'>110</Text>
                <Text className='text-white'>/150</Text>
              </View>
              <View className='flex flex-col items-center'>
                <Text className='text-white font-semibold'>Pages Read this week</Text>
                <Text className='text-white mt-3'>40 pages left</Text>
                <Text className='text-gray-400'>3 days left</Text>
              </View>
            </View>
          </View>
        )}
    </View>
  )
}

export default profile