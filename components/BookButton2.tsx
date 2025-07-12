import { View, TouchableOpacity , Image, Text  } from "react-native"
import ProgressBar from "./ProgressBar"
import { images } from "@/constants/images"
import { Trash2 , CircleCheck } from "lucide-react-native"

interface BookButton2Props {
  title: string;
  author: string;
  cover: any;
  progress: number;
  totalPages: number;
  onDelete?: ()=>void;
}

const BookButton2 = ({title , author , cover , progress , totalPages  , onDelete}: BookButton2Props)=>{

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
    )
}

export default BookButton2