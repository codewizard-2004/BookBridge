import { images } from '@/constants/images'
import React, { useState, useEffect, useCallback } from 'react'
import { Text, TouchableOpacity, View, Image, ActivityIndicator, FlatList, RefreshControl } from 'react-native'
import BookButton2 from '@/components/BookButton2'
import { useUserReadingBooks } from '@/hooks/useUserReadingBooks'
import { useUser } from '@/contexts/UserContext'
import { supabase } from '@/utils/supabaseClient'

const BooksScreen = () => {
  const [activeButton, setActiveButton] = useState(0)
  const { books: userBooks, loading: userBooksLoading, error: userBooksError, refetch: userBookRefresh } = useUserReadingBooks()
  const [books, setBooks] = useState<any[]>([])
  const { userData } = useUser() ?? {}

  // Update local books when userBooks or activeButton changes
  useEffect(() => {
    if (!userBooks) return

    let filteredBooks = userBooks
    if (activeButton === 1) {
      filteredBooks = userBooks.filter(book => (book.pages_read ?? 0) < (book.total_pages ?? 100))
    } else if (activeButton === 2) {
      filteredBooks = userBooks.filter(book => (book.pages_read ?? 0) >= (book.total_pages ?? 100))
    }

    setBooks(filteredBooks)
  }, [userBooks, activeButton])

  const handleDelete = async(id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id))
    const { data, error } = await supabase
    .from('READINGS')
    .delete()
    .eq('userId', userData.id)
    .eq('bookId', id);

    if (error) {
      console.error('Error deleting reading:', error);
      return false;
    }

    console.log('Deleted row:', data);
    return true;
  }

  const onRefresh = useCallback(() => {
    userBookRefresh()
  }, [userBookRefresh])

  if (userBooksLoading) {
    return (
      <View className="flex bg-background flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#1A73E8" />
      </View>
    )
  }

  if (userBooksError) {
    return (
      <View className="flex bg-background flex-1 items-center justify-center">
        <Text className="text-red-500 text-center">{userBooksError.message || 'Error fetching books'}</Text>
      </View>
    )
  }

  return (
    <View className="bg-background flex-1">
      <View className="w-full m-5">
        <Text className="text-primary font-semibold text-3xl">Your Books</Text>

        {/* Filter Buttons */}
        <View className="flex flex-row gap-3 mt-5">
          {['All', 'Reading', 'Completed'].map((label, index) => (
            <TouchableOpacity
              key={index}
              className={`rounded-3xl p-3 ${activeButton === index ? 'bg-primary' : 'bg-secondary'}`}
              onPress={() => setActiveButton(index)}
            >
              <Text className={`${activeButton === index ? 'text-white' : 'text-gray-400'}`}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Book List */}
        <FlatList
          data={books}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <BookButton2
              id={item.id}
              title={item.title}
              author={item.author}
              cover={item.cover}
              progress={(item.pages_read ?? 0) / (item.total_pages ?? 100)}
              totalPages={item.total_pages ?? 100}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 400 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          refreshControl={<RefreshControl refreshing={userBooksLoading} onRefresh={onRefresh} />}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center">
              <Text className="text-center text-gray-500 text-base mt-10">
                Nothing here yet! Start reading a book..
              </Text>
              <Image source={images.BookShelfGuy} style={{ height: 300, width: 300 }} />
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default BooksScreen
