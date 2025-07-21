import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function Privacy() {
  const router = useRouter();

  const [ads, setAds] = useState(true);
  const [nsfw, setNsfw] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [location, setLocation] = useState(false);

  return (
    <View className="flex-1 bg-background px-6 py-10">
      {/* Header */}
      <View className="flex-row items-center mb-6 mt-5">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={28} color="#F07900" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-semibold">Privacy Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6">
        {/* Privacy Statement */}
        <Text className="text-gray-400 text-base leading-relaxed">
          We value your privacy. This app collects minimal personal information, used only to enhance your reading experience.
          You can control data collection and preferences from the settings below.
        </Text>

        {/* Switches */}
        <View className="flex-row justify-between items-center border-b border-gray-700 pb-3">
          <Text className="text-white text-base">Personalized Ads</Text>
          <Switch
            value={ads}
            onValueChange={setAds}
            trackColor={{ false: '#444', true: '#F07900' }}
            thumbColor={ads ? '#FF9933' : '#999'}
          />
        </View>

        <View className="flex-row justify-between items-center border-b border-gray-700 pb-3">
          <Text className="text-white text-base">NSFW Content</Text>
          <Switch
            value={nsfw}
            onValueChange={setNsfw}
            trackColor={{ false: '#444', true: '#F07900' }}
            thumbColor={nsfw ? '#FF9933' : '#999'}
          />
        </View>

        <View className="flex-row justify-between items-center border-b border-gray-700 pb-3">
          <Text className="text-white text-base">Usage Analytics</Text>
          <Switch
            value={analytics}
            onValueChange={setAnalytics}
            trackColor={{ false: '#444', true: '#F07900' }}
            thumbColor={analytics ? '#FF9933' : '#999'}
          />
        </View>

        <View className="flex-row justify-between items-center border-b border-gray-700 pb-3">
          <Text className="text-white text-base">Location Access</Text>
          <Switch
            value={location}
            onValueChange={setLocation}
            trackColor={{ false: '#444', true: '#F07900' }}
            thumbColor={location ? '#FF9933' : '#999'}
          />
        </View>
      </ScrollView>
    </View>
  );
}
