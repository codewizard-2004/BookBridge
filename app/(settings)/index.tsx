import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ArrowLeft, Info, LockKeyhole, Trash } from "lucide-react-native";

export default function index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background px-4 py-6">
      {/* Header */}
      <View className="flex-row items-center mt-5 mb-8">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={28} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-semibold ml-4">Account Settings</Text>
      </View>

      {/* Options */}
      <TouchableOpacity
        className="bg-primary rounded-xl p-4 mb-4 flex flex-row items-center gap-2"
        onPress={() => router.push("/(settings)/information")}
      >
        <Info size={24} color="white" />
        <Text className="text-white text-lg font-semibold">Account Information</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#F07900] rounded-xl p-4 mb-4 flex flex-row items-center gap-2"
        onPress={() => router.push("/(settings)/change_password")}
      >
        <LockKeyhole size={24} color="white" />
        <Text className="text-white text-lg font-semibold">Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-[#F07900] rounded-xl p-4 mt-4 flex flex-row items-center gap-2"
        onPress={() => router.push("/(settings)/delete_account")}
      >
        <Trash size={24} color="white" />
        <Text className="text-white text-lg font-semibold">Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}
