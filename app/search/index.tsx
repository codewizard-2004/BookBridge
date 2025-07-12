import { router } from 'expo-router'
import { ArrowLeft, Camera } from 'lucide-react-native'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

const index = () => {
  return (
    <View className='flex-1 items-center w-full mt-10 bg-background'>
      <View className='w-full flex flex-row gap-2 justify-center items-center'>
        <TouchableOpacity onPress={()=>router.back()}>
          <ArrowLeft size={32} color="#F07900" />
        </TouchableOpacity>
        <TextInput 
          className='bg-secondary w-[75%] rounded-2xl text-textPrimary' 
          placeholder="Search Books"
          placeholderTextColor={"#B0B0B0"}
          />
        <TouchableOpacity className='w-[35px] h-[35px] rounded-full bg-primary items-center justify-center'>
          <Camera size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default index