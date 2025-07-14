import { Bookmark, BookmarkCheck } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BookButton3Props {
  title: string;
  author: string;
  cover: any;
  saved: boolean;
  genre: string;
  rating: number;
  onSave?: ()=>void;
}

const BookButton3 = ({title , author , cover , genre , saved, rating , onSave }: BookButton3Props)=>{

    return (
        
          <TouchableOpacity className='flex flex-row rounded-xl bg-secondary items-center justify-center w-[90%] h-[150px]'>
            <View>
              <Image 
                source={cover} 
                style={{ width: 90, height: 130, borderRadius: 10, marginLeft: 20 }}
                resizeMode="stretch" />
            </View>

            <View className='flex flex-col ml-3 w-[70%]'>
              <Text className='text-xl font-semibold text-white' numberOfLines={1}>{title.length > 20 ? `${title.slice(0, 15)}...` : title}</Text>
              <Text className='text-lg text-gray-400' numberOfLines={1}>{author.length > 20 ? `${author.slice(0, 15)}...` : author}</Text>
              <View className='bg-gray-200 rounded-xl w-[60px] items-center justify-center'>
                <Text className='text-black text-xs'>{genre}</Text>
              </View>
              <Text className="text-gray-400 text-sm mt-2">⭐ {rating}</Text>
            </View>
    
            <TouchableOpacity className='absolute right-5 top-5  rounded-full'  onPress={onSave}>
              {!saved ? <Bookmark size={20}/> : <BookmarkCheck size={20} color="#F07900" />}
            </TouchableOpacity>
            

          </TouchableOpacity>
    )
}

export default BookButton3