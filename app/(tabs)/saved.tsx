import BookButton3 from '@/components/BookButton3'
import { images } from '@/constants/images'
import { useUser } from '@/contexts/UserContext'
import { useSaveBook } from '@/hooks/useSaveBook'
import { supabase } from '@/utils/supabaseClient'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const saved = () => {
  const { userData , loading: userLoading} = useUser()|| {}
  const [savedBooks , setSavedBooks] = useState<any[]>([]);

  const unsaveBook = async(bookId:string) => {
    if (!userData.id) return;
    try {
      const { data, error} = await supabase
      .from("SAVED")
      .delete()
      .eq("userId" , userData.id)
      .eq("bookId" , bookId)
      .select();
      if (error) throw new Error(error.message)
      setSavedBooks(prev => prev.filter(item => item.book.id !== bookId));
    } catch (error) {
      console.log("Error while unsaving in saved page\n");
      console.log(error);
    }

  }

  useEffect(()=>{
    const getSavedBooks = async() => {
      const { data, error } = await supabase
        .from("SAVED")
        .select(`
          book:BOOKS (*)
        `)
        .eq("userId", userData.id);
        setSavedBooks(data ?? [])
      }
      getSavedBooks()
  }, [unsaveBook])
  
  return (
    <View className="bg-background flex-1">
      {userLoading ? 
        <ActivityIndicator size={"large"} color={"#F07900"}/>:(
          <View className='w-full m-5  bg-background'>
            <Text className='text-primary font-semibold  text-3xl'>Saved Books</Text>
            <FlatList
          className='bg-background'
          data={savedBooks}
          keyExtractor={item => item.book.id}
          renderItem={({ item }) => (
            <BookButton3
              id={item.book.id}
              saved={true}
              title={item.book.title}
              author={item.book.author}
              cover={item.book.cover}
              genre={item.book.genre}
              rating={item.book.rating}
              onSave={() => unsaveBook(item.book.id)}
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