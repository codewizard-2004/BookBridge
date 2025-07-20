import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function Information() {
  const router = useRouter();
  const {user} = useAuth();

  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState("John Doe");
  const [phone, setPhone] = useState("+91 9876543210");
  const [country, setCountry] = useState("India");
  const [genres, setGenres] = useState("Fiction, Sci-fi");

  

  const handleSave = () => {
    // TODO: handle save logic (e.g. API call or update context)
    console.log({ email, name, phone, country, genres });
  };

  return (
    <ScrollView className="flex-1 bg-background px-4 py-6">
      {/* Header */}
      <View className="flex-row items-center mb-6 mt-5">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-semibold ml-4">Account Information</Text>
      </View>

      {/* Form Fields */}
      <View className="space-y-4">
        <View>
          <Text className="text-white mb-1">Email</Text>
          <TextInput
            className="border border-[#444] bg-[#1a1a1a] text-white p-[15px] rounded-[10px] text-[16px]"
  placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View>
          <Text className="text-white mb-1">Name</Text>
          <TextInput
            className="border border-[#444] bg-[#1a1a1a] text-white p-[15px] rounded-[10px] text-[16px]"
  placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text className="text-white mb-1">Phone</Text>
          <TextInput
            className="border border-[#444] bg-[#1a1a1a] text-white p-[15px] rounded-[10px] text-[16px]"
  placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View>
          <Text className="text-white mb-1">Country</Text>
          <TextInput
            className="border border-[#444] bg-[#1a1a1a] text-white p-[15px] rounded-[10px] text-[16px]"
  placeholderTextColor="#999"
            value={country}
            onChangeText={setCountry}
          />
        </View>

      </View>

      {/* Save Button */}
      <TouchableOpacity
        className="bg-[#F07900] mt-8 p-4 rounded-xl"
        onPress={handleSave}
      >
        <Text className="text-white text-center text-lg font-semibold">Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
