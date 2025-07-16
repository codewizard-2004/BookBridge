import Stats from '@/components/Stats';
import { CircleUserRound, UserRoundCheck, UserRoundPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface profileProps {
  me? : boolean;
  followed?: boolean
}

const profile = ({me = true , followed = false}) => {
  
  const [selected , setSelected] = useState(followed)
  const avatar = "https://avatar.iran.liara.run/public/18";

  return (
    <ScrollView className="bg-background flex-1 flex-col" contentContainerStyle={{alignItems:"center"}}>

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

        <View className='flex flex-col w-full'>
          <Text className='text-primary text-2xl m-5 font-semibold'>Reading Stats</Text>
          <View className='flex flex-col gap-2 w-full justify-center items-center'>

            <View className='flex flex-row gap-2 ml-3'>
              <Stats value={32} text1='Books Read' text2='this year'/>
              <Stats value={7842} text1='Pages Read' text2='total'/>
            </View>

            <View className='flex flex-row gap-2 ml-3'>
              <Stats value={101} text1='Streaks' text2='All time'/>
              <Stats value={32} text1='Avg pages/day' text2='this month'/>
            </View>
          </View>
        </View>
        
        <View className='flex flex-col'>
          
        </View>

        <View className='w-full flex flex-col'>
          <Text className='text-2xl m-5 text-primary font-semibold'>Achievements</Text>
        </View>
    </ScrollView>
  )
}

export default profile