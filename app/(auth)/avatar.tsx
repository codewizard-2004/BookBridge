import { SignUpFormData } from '@/types/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const avatar = () => {
    const { formData } = useLocalSearchParams();
    const parsedFormData = formData ? JSON.parse(formData as string) as SignUpFormData : null;
    const router = useRouter()
    const avatarUrls = [
        "https://avatar.iran.liara.run/public/1",
        "https://avatar.iran.liara.run/public/3",
        "https://avatar.iran.liara.run/public/15",
        "https://avatar.iran.liara.run/public/39",
        "https://avatar.iran.liara.run/public/17",
        "https://avatar.iran.liara.run/public/48",
        "https://avatar.iran.liara.run/public/33",
        "https://avatar.iran.liara.run/public/29",
        "https://avatar.iran.liara.run/public/13",
        "https://avatar.iran.liara.run/public/45",
        "https://avatar.iran.liara.run/public/37",
        "https://avatar.iran.liara.run/public/40",
        "https://avatar.iran.liara.run/public/81",
        "https://avatar.iran.liara.run/public/68",
        "https://avatar.iran.liara.run/public/95",
        "https://avatar.iran.liara.run/public/90",
        "https://avatar.iran.liara.run/public/100",
        "https://avatar.iran.liara.run/public/97",
        "https://avatar.iran.liara.run/public/80",
        "https://avatar.iran.liara.run/public/79",
        "https://avatar.iran.liara.run/public/57",
        "https://avatar.iran.liara.run/public/63",
        "https://avatar.iran.liara.run/public/86",
        "https://avatar.iran.liara.run/public/62",

    ]
  return (
    <ScrollView className="flex-1 bg-background pt-10 pl-5" contentContainerStyle={{paddingBottom: 100}}>
      {/* Header */}
      <View className="flex-row items-center mb-4 mt-5">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="#F07900" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-2">Select an Avatar</Text>
      </View>
        <View className='flex flex-row flex-wrap gap-4 ml-2'>
            {avatarUrls.map((url, index) => (
                <TouchableOpacity key={index} onPress={() => {
                    router.push({
                        pathname: "./genre",
                        params: { formData: JSON.stringify({...parsedFormData, avatar: url}) }
                    })
                }}>
                    <Image source={{uri: url}} style={{width: 100, height: 100, borderRadius: 40}} />
                </TouchableOpacity>
            ))}
    </View>
    </ScrollView>
  )
}

export default avatar