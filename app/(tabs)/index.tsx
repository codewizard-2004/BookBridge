import BookButton from "@/components/BookButton";
//import ParallaxCarousel from "@/components/ParallaxCarousel";
import { images } from "@/constants/images";
import { useUser } from "@/contexts/UserContext";
import { ActivityIndicator, Animated, RefreshControl, ScrollView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useLatest } from "@/hooks/useLatest";
import { useTrendingBooks } from "@/hooks/useTrending";
import { useState } from "react";
import StatSection from "@/components/StatSection";
import { useUserReadingBooks } from "@/hooks/useUserReadingBooks";

export default function Index() {

  const Skeleton = () => {
  const opacity = new Animated.Value(0.3);
  Animated.loop(
    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
    ])
  ).start();

  return <Animated.View className="h-[280px] w-[170px] bg-secondary rounded-xl" style={{ opacity }} />;
};


   //set to true for loading screen
  const { userData, loading:userLoading } = useUser() ?? {};
  console.log(userData);
  const { recommendedBooks , fetching: loading } = useRecommendations();
  const { data: latestBooks, loading: latestLoading, error} = useLatest();
  const { books: trending , loading: trendLoading , error: trendError, refresh: trendingRefetch} = useTrendingBooks();
  const [ refreshing , setRefreshing ] = useState(false);
  const {books: userBooks, loading: userBooksLoading, error: userBooksError , refetch: userBookRefresh } = useUserReadingBooks()

  const onRefresh = async () => {
  setRefreshing(true);

  await trendingRefetch();
  await userBookRefresh();

  setRefreshing(false);
};
  
  const renderBook = ({item}: any)=> {
    if (!item?.volumeInfo) return null;
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
        title = { title ?? "Unknown Title" }
        author = { authors }
        progress = { 0 }
        totalPages = {100}
        genre={genre}
      />
    )
  }

  const renderBook2 = ({ item }: any) => {
  if (!item) return null;

  const { title, authors, thumbnail, categories, pageCount, id } = item;

  const genre = categories?.length ? categories[0] : "Unknown";

  return (
    <BookButton
      id={id ?? Math.random().toString()}
      cover={thumbnail ?? ""}
      title={title ?? "Unknown Title"}
      author={authors?.join(", ") ?? "Unknown Author"}
      progress={0}
      totalPages={pageCount ?? 100}
      genre={genre}
    />
  );
};

  return (
    <View className="bg-background flex-1">
      {loading ? (
        <ActivityIndicator size={"large"} className="justify-center items-center h-full" color={"#F07900"} />
      ):(
      <ScrollView 
        className="mt-8 ml-5 flex" 
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text className="text-2xl font-semibold text-primary">Welcome Back, {userData?.name}!</Text>
      
        {/* <ParallaxCarousel/> */}
        <StatSection/>
        <Text className="text-2xl mt-5 font-semibold text-textPrimary">Continue Reading</Text>
        <FlatList 
          horizontal
          data={userBooks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <BookButton
              id={item.id}
              cover={item.cover}
              title={item.title}
              author={item.author}
              genre={item.genre ?? "Unknown"}
              progress={(item.pages_read ?? 0) / (item.total_pages ?? 100)}
              totalPages={item.total_pages ?? 100}
            />
          )}

         />

         {trendLoading? (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            >
              <View className="flex flex-row w-full ml-3 gap-3">
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
              </View> 
          </ScrollView>
         ):
        <FlatList 
          horizontal
          data={trending}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={renderBook2}

         />
        }

         <Text className="text-2xl font-semibold mt-7 text-textPrimary">Recommended For You</Text>
        <FlatList 
          horizontal
          data={recommendedBooks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={ renderBook }

         />

         <Text className="text-2xl font-semibold mt-7 text-textPrimary">Latest Releases</Text>
        <FlatList 
          horizontal
          data={latestBooks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={ renderBook }

         />
      </ScrollView>
      )
    }
      
    </View>
  );
}