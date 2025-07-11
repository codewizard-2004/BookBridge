import { router } from 'expo-router'
import { ArrowLeft, Camera } from 'lucide-react-native'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

const index = () => {
  return (
    <View className='flex-1 items-center w-full mt-10'>
      <View className='w-full flex flex-row gap-2 justify-center items-center'>
        <TouchableOpacity onPress={()=>router.back()}>
          <ArrowLeft size={32} color="#1A73E8" />
        </TouchableOpacity>
        <TextInput 
          className='bg-secondary w-[75%] rounded-2xl' 
          placeholder="Search Books"
          placeholderTextColor={"#999"}
          />
        <TouchableOpacity className='w-[35px] h-[35px] rounded-full bg-primary items-center justify-center'>
          <Camera size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default index