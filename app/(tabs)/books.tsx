import { images } from '@/constants/images'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View , Image, ActivityIndicator ,FlatList} from 'react-native'
import BookButton2 from '@/components/BookButton2'

const books = () => {
  const [activeButton, setActiveButtons]  = useState(0);
  const loading = false;

  const data = [
    {
      cover: images.atomicHabits,
      title: "Atomic Habits",
      author: "James Clear",
      progress: 0.75,
      totalPages: 100
    },
    {
      cover: images.HP,
      title: "Harry Potter",
      author: "JK Rowling",
      progress: 0.5,
      totalPages: 100
    },
    {
      cover: images.LOTR,
      title: "Lord of the Rings",
      author: "JJ Tolkien",
      progress: 0.90,
      totalPages: 100
    },
    {
      cover: images.oceanDoor,
      title: "Beyond the Ocean Door",
      author: "Amisha Sathi",
      progress: 1,
      totalPages: 100
    }
  ]
  const data2 = null;

  return (
    
    <View >
      {loading   ? (
        <View className='flex flex-col w-full items-center justify-center h-full'>
          <ActivityIndicator size="large" color="#1A73E8" />
        </View>
      ):(
      <View className='w-full m-5'>
        <Text className='text-primary font-semibold  text-3xl'>Your Books</Text>
        <View id='buttons' className='flex flex-row  gap-3 mt-5'>

          <TouchableOpacity 
            className={`rounded-3xl p-3 ${activeButton === 0 ? 'bg-primary' : 'bg-secondary'}`} 
            onPress={() => setActiveButtons(0)}>
            <Text className={`${activeButton ==  0? "text-white" : "text-gray-400"}`}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className={`rounded-3xl p-3  ${activeButton === 1 ? 'bg-primary' : 'bg-secondary'}`} 
            onPress={() => setActiveButtons(1)}>
            <Text className={`${activeButton ==  1? "text-white" : "text-gray-400"}`}>Reading</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className={`rounded-3xl p-3 ${activeButton === 2 ? 'bg-primary' : 'bg-secondary'}`} 
            onPress={() => setActiveButtons(2)}>
          <Text className={`${activeButton ==  2? "text-white" : "text-gray-400"}`}>Completed</Text>
          </TouchableOpacity>

        </View>
        <FlatList
          data={data2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BookButton2
              title={item.title}
              author={item.author}
              cover={item.cover}
              progress={item.progress}
              totalPages={item.totalPages}
            />
          )}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 270 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListEmptyComponent={() => (
            <View className='flex-1  items-center justify-center'>
              <Text className="text-center text-gray-500 text-base mt-10">
                Nothing here yet! Start reading a book..
              </Text>
              <Image 
                source={images.BookShelfGuy} 
                style={{height:300  , width:300}}/>
            </View>
          )}
        />
        
      </View>
      )}
      
    </View>
  )
}

export default books