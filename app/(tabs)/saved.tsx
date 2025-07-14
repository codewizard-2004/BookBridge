import BookButton3 from '@/components/BookButton3'
import { images } from '@/constants/images'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const saved = () => {
  const data = [
      {
        id: "1",
        cover: images.atomicHabits,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "education",
        rating: 4.2
      },
      {
        id: "2",
        cover: images.HP,
        title: "Harry Potter",
        author: "JK Rowling",
        genre: "fiction",
        rating: 4.9
      },
      {
        id: "3",
        cover: images.LOTR,
        title: "Lord of the Rings",
        author: "JJ Tolkien",
        genre: "fiction",
        rating: 5.0
      },
      {
        id: "4",
        cover: images.oceanDoor,
        title: "Beyond the Ocean Door",
        author: "Amisha Sathi",
        genre: "biography",
        rating: 3.1
      }
    ]

    const loading  = false;
    const [books, setBooks] = useState(data);
    const handleDelete = (id: string) => {
      setBooks(prev => prev.filter(book => book.id !== id));
    };
  
  return (
    <View className="bg-background flex-1">
      {loading ? 
        <ActivityIndicator size={"large"} color={"#F07900"}/>:(
          <View className='w-full m-5  bg-background'>
            <Text className='text-primary font-semibold  text-3xl'>Saved Books</Text>
            <FlatList
          className='bg-background'
          data={books}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BookButton3
              title={item.title}
              author={item.author}
              cover={item.cover}
              genre={item.genre}
              rating={item.rating}
              saved = {true}

              onSave={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
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
        )  
    }
    </View>
  )
}

export default saved