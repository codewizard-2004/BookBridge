import Achievement from '@/components/Achievement';
import Stats from '@/components/Stats';
import StatSection from '@/components/StatSection';
import { useAuth } from '@/contexts/AuthContext';
import { useAchievements } from '@/hooks/useAchievements';
import { getMyFriends, getRelationship, respondToRequest, sendFriendRequest } from '@/services/friendsService';
import { supabase } from '@/utils/supabaseClient';
import { router, useLocalSearchParams } from 'expo-router';
import { Check, CircleUserRound, Clock, LogOut, ShieldAlert, User, UserRoundCheck, UserRoundPlus, X } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingSkeleton from '@/components/LoadingSkeleton';

const profile = ({ followed = true}) => {
  
  const [selected , setSelected] = useState(followed)

  const {signOut , user} = useAuth();
  const { userId } = useLocalSearchParams();
  const me = userId === user?.id;
  const [loading, setLoading] = useState(false);
  //const {userData: authUserData , loading: authUserLoading} = useUser();

  const [userData, setUserData] = useState<any>(null);
  const [userError, setUserError] = useState<any>(null);
  const [relationship, setRelationship] = useState<any>(null);
  const [friendsCount, setFriendsCount] = useState(0);
  const [friendLoading, setFriendLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  React.useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.from("USERS").select("*").eq("id", userId).single();
      if (error) {
        console.error("Error fetching user data:", error);
        setUserError(error);
        setUserData(null);
    } else {
        console.log("Fetched user data:", data);
        setUserData(data);
        setUserError(null);
    }
    };
    fetchUserData();
  }, [userId]);

  // Load relationship and friends count
  React.useEffect(() => {
    if (!me && userId) {
      loadRelationship();
    }
    if (me) {
      loadFriendsCount();
    }
  }, [userId, me]);

  const loadRelationship = async () => {
    try {
      const rel = await getRelationship(userId as string);
      setRelationship(rel);
    } catch (error) {
      console.error('Error loading relationship:', error);
    }
  };

  const loadFriendsCount = async () => {
    try {
      const friends = await getMyFriends();
      setFriendsCount(friends.length);
    } catch (error) {
      console.error('Error loading friends count:', error);
    }
  };
  console.log("User Data: ", userData);

  const handleAddFriend = async () => {
    if (!userId) return;
    setFriendLoading(true);
    try {
      await sendFriendRequest(userId as string);
      Alert.alert('Success', 'Friend request sent!');
      loadRelationship();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send friend request');
    } finally {
      setFriendLoading(false);
    }
  };

  const handleAcceptRequest = async () => {
    if (!relationship?.requestId) return;
    setFriendLoading(true);
    try {
      await respondToRequest(relationship.requestId, 'accepted');
      Alert.alert('Success', 'Friend request accepted!');
      loadRelationship();
    } catch (error) {
      Alert.alert('Error', 'Failed to accept friend request');
    } finally {
      setFriendLoading(false);
    }
  };

  const handleDeclineRequest = async () => {
    if (!relationship?.requestId) return;
    setFriendLoading(true);
    try {
      await respondToRequest(relationship.requestId, 'declined');
      Alert.alert('Success', 'Friend request declined');
      loadRelationship();
    } catch (error) {
      Alert.alert('Error', 'Failed to decline friend request');
    } finally {
      setFriendLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log("Logout clicked");
    if (loading) return; // Prevent multiple clicks
    try {
      setLoading(true);
      const result = await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }finally{
      setLoading(false);
    }
  }
  const { achievements, refreshing: achievementsLoading, refresh: loadAchievements } = useAchievements();
  const onRefresh = async () => {
    console.log("Pull-to-refresh triggered");
    setRefreshing(true);
    try {
      await loadAchievements();
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate network delay
      console.log("Achievements loaded successfully");
    } catch (error) {
      console.error("Error loading achievements:", error);
    } finally {
      setRefreshing(false);
      console.log("Refresh complete");
    }
  }
  

  return (
    <FlatList
      data={[]} // Provide an empty array if there is no list data
      keyExtractor={(item, index) => index.toString()}
      renderItem={null} // No list items to render
      className='bg-background'
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListHeaderComponent={
        <View>
          {/* Move the non-list content here */}
          <View className='w-full flex flex-row m-5 items-center gap-20'>
            <View className='flex flex-row ml-5'>
              {userData?.profile_url ? (
                <Image source={{ uri: userData.profile_url }} style={{ width: 60, height: 60, borderRadius: 16 }} />
              ) : (
                <CircleUserRound size={60} color="#F07900" />
              )}
              <View className='flex flex-col ml-5'>
                <Text className='text-white font-semibold text-2xl'>{userData?.name}</Text>
                <TouchableOpacity onPress={() => router.push("/friends")}>
                  <Text className='text-gray-400 text-sm'>{friendsCount} friends</Text>
                </TouchableOpacity>
              </View>
            </View>
            {!me && relationship && (
              <View className="flex-row gap-2">
                {relationship.state === 'none' && (
                  <TouchableOpacity 
                    onPress={handleAddFriend}
                    disabled={friendLoading}
                    className='rounded-full justify-center items-center mx-3 my-3 w-[35px] h-[35px] bg-white'
                  >
                    {friendLoading ? (
                      <ActivityIndicator size="small" color="black" />
                    ) : (
                      <UserRoundPlus size={26} color="black"/>
                    )}
                  </TouchableOpacity>
                )}
                {relationship.state === 'friends' && (
                  <View className='rounded-full justify-center bg-green-600 items-center mx-3 my-3 w-[35px] h-[35px]'>
                    <UserRoundCheck size={26} color="white"/>
                  </View>
                )}
                {relationship.state === 'outgoing' && (
                  <View className='rounded-full justify-center bg-orange-500 items-center mx-3 my-3 w-[35px] h-[35px]'>
                    <Clock size={26} color="white"/>
                  </View>
                )}
                {relationship.state === 'incoming' && (
                  <View className="flex-row gap-1">
                    <TouchableOpacity 
                      onPress={handleAcceptRequest}
                      disabled={friendLoading}
                      className='rounded-full justify-center bg-green-600 items-center mx-1 my-3 w-[30px] h-[30px]'
                    >
                      {friendLoading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Check size={20} color="white"/>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={handleDeclineRequest}
                      disabled={friendLoading}
                      className='rounded-full justify-center bg-red-600 items-center mx-1 my-3 w-[30px] h-[30px]'
                    >
                      <X size={20} color="white"/>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>

           {me && (
              <View className='flex  flex-col w-full'>
              <Text className='text-primary text-2xl m-5 font-semibold'>This Week's Goals</Text>
              <View className='ml-3 w-full'>
                {refreshing ? 
                <View className='w-[95%] mb-3 flex items-center'>
                  <LoadingSkeleton height={350} width={350}/>
                </View> :
                <StatSection />
                }
              </View>
              
              </View>
            )}

            <View className='flex flex-col w-full'>
              {refreshing ? (
                <View className='flex flex-row flex-wrap gap-2 justify-center items-center'>
                  <LoadingSkeleton height={140} width={170}/>
                  <LoadingSkeleton height={140} width={170}/>
                  <LoadingSkeleton height={140} width={170}/>
                  <LoadingSkeleton height={140} width={170}/>
                </View> ):(
                  <>
              <Text className='text-primary text-2xl m-5 font-semibold'>Reading Stats</Text>
              <View className='flex flex-col gap-2 w-full justify-center items-center'>

                <View className='flex flex-row gap-2 ml-3'>
                  <Stats value={32} text1='Books Read' text2='this year'/>
                  <Stats value={7842} text1='Pages Read' text2='total'/>
                </View>

                <View className='flex flex-row gap-2 ml-3'>
                  <Stats value={101} text1='Streaks' text2='All time'/>
                  <Stats value={32} text1='Avg pages/day' text2='this month'/>
                </View>

              </View>
              </>)}
            </View>
            
            <View className='flex flex-col'>
              
            </View>

            <View className='w-full flex flex-col'>
              <Text className='text-2xl m-5 text-primary font-semibold'>Achievements</Text>
              {refreshing ? (
                <View className='flex flex-row flex-wrap gap-2 justify-center items-center'>
                  <LoadingSkeleton height={140} width={170}/>
                  <LoadingSkeleton height={140} width={170}/>
                  <LoadingSkeleton height={140} width={170}/>
                  <LoadingSkeleton height={140} width={170}/>
                </View> ):
              <FlatList
                data={achievements}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                columnWrapperStyle={{ justifyContent: 'center', gap: 8 }} // gap between items horizontally
                contentContainerStyle={{ paddingBottom: 100 }} // optional padding
                renderItem={({ item, index }) => (
                  <Achievement
                    key={index}
                    index={index}
                    icon={item.emoji}
                    title={item.name}
                    description={item.description}
                    rarity={
                      ['common', 'rare', 'epic', 'legendary'].includes(item.rarity)
                        ? item.rarity as 'common' | 'rare' | 'epic' | 'legendary'
                        : 'common'
                    }
                  />
                )}
              />}
            </View>

            {me && (
            <View className='w-full flex flex-col justify-center items-center gap-4 mt-5'>
              <TouchableOpacity className='flex flex-row bg-primary rounded-xl w-[90%] items-center p-2' onPress={()  => router.push("/(settings)")}>
                <User size={24} color="white" className='ml-5'/>
                <Text className='text-white text-center text-lg font-semibold p-2'>Account Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity className='flex flex-row bg-primary rounded-xl w-[90%] items-center p-2' onPress={() => router.push("/privacy")}>
                <ShieldAlert size={24} color="white" className='ml-5'/>
                <Text className='text-white text-center text-lg font-semibold p-2'>Privacy and safety</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className={`flex flex-row bg-secondary rounded-xl w-[90%] items-center p-2 ${loading && "justify-center"}`}
                onPress={handleLogout}>
                {loading ? (
                  <ActivityIndicator color="white" size={"large"}/>):
                  (
                    <>
                    <LogOut size={24} color="white" className='ml-5' onPress={handleLogout}/>
                    <Text className='text-white text-center text-lg font-semibold p-2'>Log out</Text>
                    </>
                  )}
              </TouchableOpacity>
            </View>
            )}
        </View>
      }
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 100, minHeight: "100%" }}
    />
  )
}

export default profile