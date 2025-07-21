import { dummyUsers } from '@/constants/dummyUsers';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Friends() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black px-4 pt-12">
      {/* Header */}
      <View className="flex-row items-center mb-4 mt-5">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft color="#F07900" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-2">Friends</Text>
      </View>

      {/* Search Input */}
      <TextInput
        placeholder="Find friends..."
        placeholderTextColor="#999"
        className="bg-[#1a1a1a] text-white px-4 py-3 rounded-xl mb-4"
      />

      {/* Friend List */}
      <FlatList
        data={dummyUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-[#1a1a1a] p-4 rounded-xl flex-row justify-between items-center mb-3"
          onPress={() => router.push({ pathname: "/(tabs)/profile", params: { userId: item.id } })}>
            <View className="flex-row items-center space-x-3 gap-2">
              <Image source={{uri: item.avatar}} style={{ width: 60, height: 60, borderRadius: 16 }} />
              <View>
                <Text className="text-white font-semibold">{item.name}</Text>
                <Text className="text-[#F07900]" numberOfLines={1}>Reading: {item.lastBookRead.substring(0, 30)}</Text>
                <Text className="text-gray-400">{item.booksRead} books read</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
