import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { ArrowLeft, Trophy, UserCheck, Trash2, CheckCircle, Bell, BellOff } from "lucide-react-native";
import { useRouter } from "expo-router";
import CustomModal from "@/components/CustomModal";
import { useNotifications } from "@/hooks/useNotifications";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { supabase } from "@/utils/supabaseClient";
import { useUser } from "@/contexts/UserContext";


export const timeAgo = (timestamp: string | Date) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diff = (now.getTime() - past.getTime()) / 1000; // difference in seconds

  if (diff < 60) return "just now"; // less than a minute
  if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (diff < 604800) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (diff < 2592000) {
    const weeks = Math.floor(diff / 604800);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (diff < 31536000) {
    const months = Math.floor(diff / 2592000);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  const years = Math.floor(diff / 31536000);
  return `${years} year${years > 1 ? "s" : ""} ago`;
};


const NotificationItem = ({ item }: { item: any }) => {
  const Icon =
    item.type === "achievement"
      ? Trophy
      : item.type === "friend"
      ? UserCheck
      : Trophy;

  return (
    <View
      className={`mx-4 mb-3 p-4 rounded-2xl border ${
        !item.isRead 
          ? "bg-gray-900/30 border-gray-800/30" 
          : "bg-gray-900 border-[#F07900]/20"
      }`}
      style={{
        shadowColor: item.read ? "transparent" : "#F07900",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: item.read ? 0 : 4,
      }}
    >
      <View className="flex-row items-start">
        {/* Unread indicator */}
        <View className="mr-3 pt-1">
          {!item.isRead ? (
            <View className="w-3 h-3 rounded-full bg-[#F07900] shadow-lg shadow-[#F07900]/50" />
          ) : (
            <View className="w-3 h-3" />
          )}
        </View>

        {/* Icon with background */}
        <View className={`p-2 rounded-full mr-3 ${
          item.isRead
            ? "bg-gray-700/50"
            : item.type === "achievement" 
              ? "bg-[#F07900]/20" 
              : "bg-blue-500/20"
        }`}>
          <Icon 
            color={
              item.isRead
                ? "#6B7280"
                : item.type === "achievement" ? "#F07900" : "#3B82F6"
            } 
            size={20} 
          />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text
            className={`font-bold text-base mb-1 ${
              item.isRead ? "text-gray-500" : "text-white"
            }`}
          >
            {item.type === "achievement" ? "Achievement Unlocked!" : "Friend Request Update"}
          </Text>
          <Text className={`text-sm leading-5 mb-2 ${
            item.isRead ? "text-gray-600" : "text-gray-300"
          }`}>
            {item.type == "achievement" ? `You completed the achievement: ${item.message}`: `Your friend request was ${item.message}`}
          </Text>
          <Text className="text-xs text-gray-500 font-medium">
            {timeAgo(item.created_at)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const NotificationsPage = () => {
  const navigation = useRouter();
  const [modalOpen , setModalOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const { userData } = useUser() ?? {};

  const { notifications, loading, refresh } = useNotifications();
 
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = async () => {
    const { data, error } = await supabase
      .from("NOTIFICATIONS")
      .update({ isRead: true })
      .eq("userId", userData.id)
      console.log(data)
    if (error) {
      console.log("Error", error);
    } else {
      refresh();
    }
  };

  const deleteAll = () => {
    setTitle("Delete All notifications")
    setText("Are you sure you want to delete all notifications? This action cannot be undone.")
    setModalOpen(true);
  };

  const deleteAllConfirmed = async () => {
    console.log("Deleting all notifications")
    const { data, error } = await supabase
      .from("NOTIFICATIONS")
      .delete()
      .eq("userId", userData.id)
    if (error) {
      console.log("Error", error);
    }else{
      refresh();
    }
  }



  return (
    <View className="flex-1 bg-background">
      <CustomModal 
        title={title} 
        text={text} 
        visible={modalOpen} 
        onPress={()=> setModalOpen(!modalOpen)} 
        onPressOK={() => {
          console.log("OK pressed")
          deleteAllConfirmed();
          setModalOpen(!modalOpen)
          }}/>
      {/* Header */}
      <View className="px-4 py-4 border-b border-gray-800/50 mt-10">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity
            onPress={() => navigation.back()}
            className="p-2 rounded-full bg-gray-900/50"
            activeOpacity={0.7}
          >
            <ArrowLeft color="#F07900" size={24} />
          </TouchableOpacity>
          
          <View className="flex-row items-center">
            <Bell color="#F07900" size={24} className="mr-2" />
            <Text className="text-xl font-bold text-white">Notifications</Text>
            {unreadCount > 0 && (
              <View className="ml-2 px-2 py-1 rounded-full bg-[#F07900]">
                <Text className="text-xs font-bold text-black">{unreadCount}</Text>
              </View>
            )}
          </View>

          <View className="w-10" />
        </View>

        {/* Action buttons */}
        {notifications.length > 0 && (
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={markAllRead}
              className="flex-row items-center px-4 py-2 rounded-full bg-[#F07900]/10 border border-[#F07900]/20"
              activeOpacity={0.8}
              disabled={unreadCount === 0}
            >
              <CheckCircle color="#F07900" size={16} className="mr-2" />
              <Text className={`text-sm font-semibold ${
                unreadCount === 0 ? "text-gray-500" : "text-[#F07900]"
              }`}>
                Mark All Read
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={deleteAll}
              className="flex-row items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20"
              activeOpacity={0.8}
            >
              <Trash2 color="#EF4444" size={16} className="mr-2" />
              <Text className="text-sm font-semibold text-red-500">
                Delete All
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Notifications List */}
      {loading ? (
        <View className="flex-1 items-center gap-2">
          <LoadingSkeleton height={120} width={350}/>
          <LoadingSkeleton height={120} width={350}/>
          <LoadingSkeleton height={120} width={350}/>
          <LoadingSkeleton height={120} width={350}/>
          <LoadingSkeleton height={120} width={350}/>
        </View>
      ) :
      notifications.length > 0 ? (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          contentContainerStyle={{ 
            paddingTop: 16,
            paddingBottom: 32 
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-8">
          <View className="p-6 rounded-full bg-gray-900/50 mb-4">
            <BellOff color="#6B7280" size={48} />
          </View>
          <Text className="text-xl font-semibold text-gray-400 mb-2 text-center">
            No notifications
          </Text>
          <Text className="text-gray-500 text-center leading-6">
            You're all caught up! We'll notify you when there's something new.
          </Text>
        </View>
      )}
    </View>
  );
};

export default NotificationsPage;