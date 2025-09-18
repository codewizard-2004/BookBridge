import { Search, ArrowUpLeft} from 'lucide-react-native'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

interface searchHistoryProps {
    name: string;
    onPress: any;
}

const SearchHistory = ({name, onPress}:searchHistoryProps) => {
    return (
        <TouchableOpacity className='flex flex-row ml-3 w-full items-center' onPress={onPress}>
            <View className='w-[10%]'>
                <Search size={24} color="white" />
            </View>
            
            <View className='w-[72%] items-center'>
                <Text className='text-lg text-white ' numberOfLines={1}>{name}</Text>
            </View>
            
            <View className='w-[10%]'>
                <ArrowUpLeft size={24} color="white" />
            </View>
            
        </TouchableOpacity>
    )
}


export default SearchHistory