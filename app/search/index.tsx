import SearchHistory from '@/components/SearchHistory'
import { router } from 'expo-router'
import { ArrowLeft, Camera , Trash2} from 'lucide-react-native'
import React from 'react'
import { TextInput, TouchableOpacity, View, Text , Pressable} from 'react-native'

const index = () => {

  const [searchHistory , setSearchHistory] = React.useState<string[]>(["Harry Potter", "Atomic Habits", "Lord of the Rings"]);
  return (
    <View className='flex-1 items-center w-full mt-10 '>
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

      {/*BELOW SEARCH BAR */}
      { searchHistory.length > 0 ? (
        <View className='w-full ml-10 mt-3'>
          <Text className='text-xl font-semibold'>Recent Searches</Text>

          <View className='gap-5'>
            {/* <SearchHistory name='Atomic Habits'/>
            <SearchHistory name='Lord of the rings'/>
            <SearchHistory name='Beyond the Ocean Door'/> */}
            {searchHistory.map((item, index) => (
              <SearchHistory key={index} name={item} />
            ))}
          </View>

          <Pressable
            onPress={() => {setSearchHistory([])}}
            className="bg-primary px-5 py-2 mt-16 rounded-xl w-[90%] items-center justify-center flex flex-row gap-2"
            style={({ pressed }) => ({
              backgroundColor: pressed ? 'red' : '#1A73E8',
            })}
          >
            <Trash2 size={20} color="white" />
            <Text className="text-white font-medium text-base">clear search history</Text>
          </Pressable>
        </View>):(
          <View>
            <Text className='text-xl  font-semibold mt-5'>Search for books or scan ISBN barcode</Text>
          </View>
        )}
    </View>
  )
}

export default index