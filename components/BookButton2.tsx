import { Link } from "expo-router";
import { CircleCheck, Trash2 } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "./ProgressBar";

interface BookButton2Props {
  id: any;
  title: string;
  author: string;
  cover: any;
  progress: number;
  totalPages: number;
  onDelete?: ()=>void;
}

const BookButton2 = ({id, title , author , cover , progress , totalPages  , onDelete }: BookButton2Props)=>{
    const safeCover =
    typeof cover === "string"
      ? cover.replace("http://", "https://")
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLx8PkaSqRN3OG9leVVVOIRSfPxyYcl4ZjXA&s";
    return (
        <Link href={`/movies/${id}` as any}
            asChild
            >
          <TouchableOpacity className='flex flex-row rounded-xl bg-secondary items-center justify-center w-[90%] h-[150px]'>
            <View>
              <Image 
                source={{uri: safeCover}} 
                style={{ width: 90, height: 130, borderRadius: 10, marginLeft: 20 }}
                resizeMode="stretch" />
            </View>
            <View className='flex flex-col ml-3 w-[70%]'>
              <Text className='text-xl font-semibold text-white' numberOfLines={1}>{title.length > 20 ? `${title.slice(0, 15)}...` : title}</Text>
              <Text className='text-lg text-gray-400' numberOfLines={1}>{author.length > 20 ? `${author.slice(0, 15)}...` : author}</Text>
              <ProgressBar progress={progress}/>
              <Text className='text-gray-400'>{Math.round(progress * totalPages)}/{totalPages} pages</Text>
              { progress === 1 && (
                <View  className="flex flex-row items-center gap-1">
                  <Text className='text-green-500'>Completed</Text>
                  <CircleCheck color='green' size={15}/>
                </View>
                )
              }
            </View>
    
            <TouchableOpacity className='absolute right-5 top-5  rounded-full'  onPress={onDelete}>
              <Trash2 color='red' size={20} />
            </TouchableOpacity>

          </TouchableOpacity>
    </Link>
    )
}

export default BookButton2