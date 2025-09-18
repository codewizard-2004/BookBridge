import BookButton from '@/components/BookButton'
import SearchHistory from '@/components/SearchHistory'
import { images } from '@/constants/images'
import { useUser } from '@/contexts/UserContext'
import { useBooks } from '@/hooks/useBooks'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { supabase } from '@/utils/supabaseClient'
import { router } from 'expo-router'
import { ArrowLeft, Barcode, Search, Trash2 } from 'lucide-react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const index = () => {

  const { userData } = useUser() || {};
  const [searchItem , setSearchItem] = useState<string>("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const { history , clearHistory } = useSearchHistory();
  const {books , fetching} = useBooks({type:"search" , query:submittedQuery})
  
  const handleSearch = async (query?: string) => {
  const searchQuery = query ?? searchItem;

  if (!searchQuery.trim()) return;

  setSearchInitiated(true);
  setSubmittedQuery(searchQuery);
  
  if (!query){
    const { data, error } = await supabase
      .from("HISTORY")
      .insert([{ userId: userData.id, search_item: searchQuery }])
      .select();

    if (error) {
      console.error("Error inserting history:", error);
    } else {
      console.log("Written to database", data);
    }
}
};


  const renderBook = ({item}: any)=> {
    const { title , authors , imageLinks, categories } = item.volumeInfo;
    let genre = "";
    try{
      genre = categories.length > 0 ? categories[0] : "Unknown";
    }catch{
      genre ="Unknown"
    }
    
    
    return (
      <BookButton 
        id={item.id}
        cover = { imageLinks?.thumbnail }
        title = { title }
        author = { authors }
        progress = { 0 }
        totalPages = {100}
        genre={genre}
      />
    )
  }

  return (
    <View className='flex-1 items-center w-full bg-background'>
      <View className='w-full mt-10 flex flex-row gap-2 justify-center items-center'>
        <TouchableOpacity onPress={() => {
          setSearchInitiated(false);
          router.back()}}>
          <ArrowLeft size={32} color="#F07900" />
        </TouchableOpacity>
        <TextInput 
          className='bg-secondary w-[75%] rounded-2xl text-textPrimary' 
          placeholder="Search Books"
          placeholderTextColor={"#B0B0B0"}
          value={searchItem}
          onChangeText={(value) => setSearchItem(value)}
          />
        <TouchableOpacity 
          onPress={()=>handleSearch()}
          className={`w-[35px] h-[35px] rounded-full bg-primary items-center justify-center`}>
          <Search size={20} color="white" />
        </TouchableOpacity>

      </View>

      {/*BELOW SEARCH BAR */}
      {searchInitiated && fetching ? (
        <ActivityIndicator size={"large"} color={"#F07900"} />
      ) : books.length > 0 ? (
        <View className='h-full mt-5 ml-2 items-center justify-center'>
          <Text className='text-gray-400'>Showing result for {submittedQuery}</Text>
          <FlatList 
            data={books}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />} 
            showsHorizontalScrollIndicator={false}
            renderItem={renderBook}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 10,
              marginBottom: 50
            }}
            className="mt-2 pb-40"
            scrollEnabled={true}
          />
        </View>
      ) : history.length > 0 ? (
        <View className='w-full ml-10 mt-3'>
          <Text className='text-xl font-semibold text-white pb-4'>Recent Searches</Text>
          <View className='gap-5'>
            {history.map((item, index) => (
              <SearchHistory key={index} name={item} onPress={()=>handleSearch(item)} />
            ))}
          </View>
          <Pressable
            onPress={clearHistory}
            className="bg-primary px-5 py-2 mt-16 rounded-xl w-[90%] items-center justify-center flex flex-row gap-2"
            style={({ pressed }) => ({
              backgroundColor: pressed ? 'red' : '#1A73E8',
            })}
          >
            <Trash2 size={20} color="white" />
            <Text className="text-white font-medium text-base">clear search history</Text>
          </Pressable>
        </View>
      ) : (
        <View className='flex flex-col items-center h-full'>
          <Text className='text-center text-base text-gray-400 mt-5 ml-4'>Nothing here! Search for books or scan IBSN</Text>
          <Image source={images.SearchImg} style={{ height: 300, width: 300 }} />
        </View>
      )}

      <TouchableOpacity 
        onPress={() => router.push("/search/barcode")}
        className='w-[35px] h-[35px] scale-150 rounded-full bg-primary items-center justify-center absolute bottom-10 right-5'>
        <Barcode size={20} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default index