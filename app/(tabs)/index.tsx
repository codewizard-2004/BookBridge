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
import { useRecommendation } from "@/hooks/useRecommendation";
import { BookOpen, Clock, Medal } from "lucide-react-native";
import ProgressBar from "@/components/ProgressBar";

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
  <View className="w-[95%] h-[350px] mt-2 bg-secondary rounded-3xl p-4">
    {/* Stats Section */}
    <View className="flex flex-col gap-4">
      {/* Reading Time */}
      <View className="w-full border-b border-gray-600 pb-3">
        <View className="flex flex-row items-center justify-between mb-2">
          <View className="flex flex-row items-center gap-3 w-[70%]">
            <Clock size={20} color="white" />
            <View>
              <Text className="text-white font-medium">Reading Time</Text>
              <Text className="text-xs text-gray-400">180 / 300 min</Text>
            </View>
          </View>
          <Text className="text-sm text-white font-semibold">60%</Text>
        </View>
        <ProgressBar progress={0.6} />
      </View>

      {/* Pages Read */}
      <View className="w-full border-b border-gray-600 pb-3">
        <View className="flex flex-row items-center justify-between mb-2">
          <View className="flex flex-row items-center gap-3 w-[70%]">
            <BookOpen size={20} color="white" />
            <View>
              <Text className="text-white font-medium">Pages Read</Text>
              <Text className="text-xs text-gray-400">89 / 150 pages</Text>
            </View>
          </View>
          <Text className="text-sm text-white font-semibold">59%</Text>
        </View>
        <ProgressBar progress={0.59} />
      </View>

      {/* Books Finished */}
      <View className="w-full pb-3 border-b border-gray-600">
        <View className="flex flex-row items-center justify-between mb-2">
          <View className="flex flex-row items-center gap-3 w-[70%]">
            <Medal size={20} color="white" />
            <View>
              <Text className="text-white font-medium">Books Finished</Text>
              <Text className="text-xs text-gray-400">1 / 2 books</Text>
            </View>
          </View>
          <Text className="text-sm text-white font-semibold">50%</Text>
        </View>
        <ProgressBar progress={0.5} />
      </View>
    </View>

    {/* Streak Section */}
    <View className="mt-4 items-center">
      <Text className="text-gray-400 text-xs font-semibold mb-2">
        Streak this week
      </Text>
      <View className="flex flex-row justify-between w-full px-2">
        {[
          { day: "Mon", icon: "🔥" },
          { day: "Tue", icon: "🔥" },
          { day: "Wed", icon: "🔥" },
          { day: "Thu", icon: "🔥" },
          { day: "Fri", icon: "❄️" },
          { day: "Sat", icon: "❄️" },
          { day: "Sun", icon: "🔥" },
        ].map(({ day, icon }) => (
          <View
            key={day}
            className="flex flex-col justify-center items-center gap-1"
          >
            <Text className="text-lg">{icon}</Text>
            <Text className="text-xs text-gray-400">{day}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);


   //set to true for loading screen
  const { userData, loading:userLoading } = useUser() ?? {};
  console.log(userData);
 // const { recommendedBooks , fetching: loading } = useRecommendations();
  const { recommendedBooks: recommendedBooks2 , fetching: fetching2} = useRecommendation();
  const { data: latestBooks, loading: latestLoading, error} = useLatest();
  console.log(latestBooks[0]?.author)
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

  const renderBook2 = ({item}: any) => (
    <BookButton 
      id={item.key}
      cover={item.cover_i}
      title={item.title}
      author={item.author_name?.join(",") || "Unknown Author"}
      totalPages={item.number_of_pages || 0}
      genre={"Unknown genre"}
      progress={0}
      />
  )

  const SkeletonArray = () => (
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
  )

  return (
    <View className="bg-background flex-1">
      {fetching2 ? (
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

         <Text className="text-2xl font-semibold mt-7 text-textPrimary">Recommended For You </Text>
         {fetching2? <SkeletonArray/>:
        <FlatList 
          horizontal
          data={recommendedBooks2}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={ ({item}) => (
            <BookButton 
              id={item.key}
              cover={item.cover}
              title={item.title}
              author={item.author_name?.join(",") || "Unknown Author"}
              totalPages={item.number_of_pages || 0}
              genre={item.genre || "Unknown genre"}
              progress={0}
            />
          ) }

         />}

         <Text className="text-2xl font-semibold mt-7 text-textPrimary">Trending Books</Text>
         {trendLoading? (
          <SkeletonArray />
         ):
        <FlatList 
          horizontal
          data={trending}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={renderBook2 }

         />
        }

         <Text className="text-2xl font-semibold mt-7 text-textPrimary">Latest Releases</Text>
        <FlatList 
          horizontal
          data={latestBooks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
          showsHorizontalScrollIndicator={false}
          renderItem={ renderBook2 }

         />
      </ScrollView>
      )
    }
      
    </View>
  );
}
