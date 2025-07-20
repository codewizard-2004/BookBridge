import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function DeleteAccount() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleDeleteAccount = () => {
    if (!password) {
      Alert.alert('Error', 'Please enter your password.');
      return;
    }

    // Replace with actual account deletion logic (e.g., Supabase)
    Alert.alert('Account Deleted', 'Your account has been permanently removed.');
  };

  return (
    <View className="flex-1 bg-black px-6 py-10">
      {/* Header */}
      <View className="flex-row items-center mb-8">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={28} color="#F07900" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-semibold">Delete Account</Text>
      </View>

      {/* Warning */}
      <Text className="text-gray-400 mb-6 text-base leading-relaxed">
        Warning: Deleting your account is irreversible. All your data will be permanently removed. Please enter your current password to confirm.
      </Text>

      {/* Password Input */}
      <TextInput
        placeholder="Enter current password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border border-[#444] bg-[#1a1a1a] text-white p-[15px] rounded-[10px] text-[16px] mb-6"
      />

      {/* Delete Button */}
      <TouchableOpacity
        className="bg-[#F07900] rounded-xl py-4 items-center"
        onPress={handleDeleteAccount}
      >
        <Text className="text-white font-semibold text-base">Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}
