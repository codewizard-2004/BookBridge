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

export default function Index() {

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
      progress: 0,
      totalPages: 100
    }
  ]

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

const SecondSlide = () => (
  <View className="w-[95%] h-[200px] bg-secondary rounded-3xl justify-center items-center">
    <View className="flex justify-between w-[90%] flex-row">
      <Text className="text-xl font-semibold text-primary">Weekly Goal</Text>
      <Text className='text-textSecondary'>3 days left</Text>
    </View>
    <View className='w-[100px] h-[100px] rounded-full bg-primary flex flex-col justify-center items-center'>
        <Text className='text-3xl text-white font-semibold'>110</Text>
        <Text className='text-white'>/ 150</Text>
    </View>
    <Text className='text-textSecondary'>pages read</Text>
  </View>
);

   //set to true for loading screen
  const { userData, loading:userLoading } = useUser() ?? {};
  console.log(userData);
  const { recommendedBooks , fetching: loading } = useRecommendations();
  const { data: latestBooks, loading: latestLoading, error} = useLatest();
  const { books: trending , loading: trendLoading , error: trendError, refetch: trendingRefetch} = useTrendingBooks(10);
  const [ refreshing , setRefreshing ] = useState(false);

  const onRefresh = async () => {
  setRefreshing(true);

  await trendingRefetch();

  setRefreshing(false);
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
        <SecondSlide />
        <Text className="text-2xl mt-5 font-semibold text-textPrimary">Continue Reading</Text>
        <FlatList 
          horizontal
          data={data}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <BookButton
              {...item}
            />
          )}

         />

         <Text className="text-2xl font-semibold mt-7 text-textPrimary">Trending Books</Text>
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
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <BookButton 
              id={item.key}
              cover={`https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`}
              title={item.title}
              author={item.author_name?.join(",") || "Unknown Author"}
              totalPages={item.number_of_pages || 0}
              genre={"Unknown genre"}
              progress={0}
            />
          ) }

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
