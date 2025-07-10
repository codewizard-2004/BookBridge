import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from './ProgressBar';

type BookButtonProps = {
  cover: any; 
  title: string;
  author: string;
  progress: number;
  pagesRead: number;
  totalPages: number;
  isNew?: boolean;
};

const BookButton: React.FC<BookButtonProps> = ({ cover, title, author, progress, totalPages }) => {
  return (
    <TouchableOpacity
      className="h-[270px] w-[200px] rounded-xl bg-white items-center"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderRadius:20,
        elevation: 3, // Android elevation
      }}
    >
      <View style={{ alignItems: 'center', width: '100%' }}>
        <Image 
            resizeMode="stretch"
            source={cover}
            style={{
                width: 200,
                height: progress > 0 ? 150 : 200,
                marginTop: 0,
                borderRadius: 20
            }}
        />
        <View className='w-full ml-3'>
            <Text className='text-xl font-semibold mt-1'>{title}</Text>
            <Text className='text-sm text-gray-400'>{author}</Text>
            { progress > 0 && (
              <>
              <ProgressBar progress={progress}/>
              <Text className='text-sm text-gray-400'>{Math.round(progress * totalPages)}/{totalPages} pages</Text>
            </>
            )
            }
          
        </View>
      </View>
    </TouchableOpacity>

  )
}

export default BookButton