import { gifs } from '@/constants/gifs'
import { router } from 'expo-router'
import { ArrowLeft} from 'lucide-react-native'
import React from 'react'
import { View, Text , Image} from 'react-native'
import ReadCalendar from '@/components/ReadCalendar';

const index = () => {

    const missed = new Set([
      '2025-07-04',
      '2025-07-09',
      '2025-07-18',
    ]);

  return (
    <View className='flex-1 h-full w-full bg-background items-center'>
        <View className='w-full mt-10 ml-5 gap-2 flex flex-row items-center'>
            <ArrowLeft size={32} color="#F07900" onPress={()=>router.back()}/>
            <Text className='text-primary text-2xl font-semibold'>Streak Society</Text>
        </View>

        <View className='flex flex-col w-[90%] h-[350px] bg-accent rounded-2xl mt-2  justify-center items-center'>
            <View className='w-full flex flex-row h-[50%]'>
                <View className='w-[50%] items-center justify-center'>
                    <Text className='text-white text-4xl font-bold mt-16'>105</Text>
                    <Text  className='text-white text-2xl'>Streak Day!</Text>
                </View>
                <View className='w-[50%] items-center justify-center mt-8'>
                    <Image source={gifs.FLAME}  style={{height:150 , width:120}}/> 
                </View>
            </View>
            <View className='h-[30%] w-[90%] mt-3 flex items-center justify-center bg-zinc-800 rounded-2xl'>
                <Text className='text-white font-semibold  ml-2'>Read books to extend your streak. Miss a day, you start from zero..</Text>
            </View>
        </View>

        <View className='w-full mt-8'>
            <Text className='text-2xl font-semibold mb-4  ml-5 text-primary'>Streak Calendar</Text>
            <View className='w-[100%]  h-[400px]'>
               <ReadCalendar 
                missedDates={missed} // Example missed dates
                startDate="2025-01-01" // Example start date
                endDate="2025-12-31" // Example end date
            /> 
            </View>
            
        </View>
      
    </View>
  )
}

export default index