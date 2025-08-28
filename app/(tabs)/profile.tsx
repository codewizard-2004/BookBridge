import Achievement from '@/components/Achievement';
import Stats from '@/components/Stats';
import { achievements } from '@/constants/achievements';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/utils/supabaseClient';
import { router, useLocalSearchParams } from 'expo-router';
import { CircleUserRound, LogOut, ShieldAlert, User, UserRoundCheck, UserRoundPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const profile = ({ followed = true}) => {
  
  const [selected , setSelected] = useState(followed)

  const {signOut , user} = useAuth();
  const { userId } = useLocalSearchParams();
  const me = userId === user?.id;
  const [loading, setLoading] = useState(false);
  //const {userData: authUserData , loading: authUserLoading} = useUser();

  const [userData, setUserData] = useState<any>(null);
  const [userError, setUserError] = useState<any>(null);

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
  console.log("User Data: ", userData);

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

  return (
    <ScrollView className="bg-background flex-1 flex-col" contentContainerStyle={{alignItems:"center" , paddingBottom: 100}}>

      <View className='w-full flex flex-row m-5 items-center gap-20'>
        <View className='flex flex-row ml-5'>
          {userData?.profile_url?
              <Image source={{uri: userData.profile_url}} style={{ width: 60, height: 60, borderRadius: 16 }} />:
              <CircleUserRound size={60} color="#F07900"/>
          }
          <View className='flex flex-col ml-5'>
            <Text className='text-white font-semibold text-2xl'>{userData?.name}</Text>
            {/* <Text className='text-gray-400'>{user?.email}</Text> */}
            <TouchableOpacity onPress={()=>router.push("/friends")}>
              <Text className='text-gray-400 text-sm'>3 friends</Text>
            </TouchableOpacity>
          </View>
        </View>
        {!me && !selected && (
          <TouchableOpacity onPress={() => setSelected(!selected)} className='rounded-full justify-center items-center mx-3 my-3 w-[35px] h-[35px] bg-white'>
            <UserRoundPlus size={26} color="black"/>
          </TouchableOpacity>
        )}
        {!me && selected && (
          <TouchableOpacity onPress={() => setSelected(!selected)} className='rounded-full justify-center bg-secondary items-center mx-3 my-3 w-[35px] h-[35px] '>
            <UserRoundCheck size={26} color="white"/>
          </TouchableOpacity>
        )}
      </View>

       {me && (
          <View className='bg-secondary rounded-xl h-[200px] w-[90%] flex flex-col'>
            <Text className='text-primary font-semibold text-2xl m-3'>This weeks goal</Text>
            <View className='flex flex-row m-3'>
              <View className='w-[100px] h-[100px] flex flex-col justify-center items-center rounded-full bg-primary'>
                <Text className='text-white font-semibold text-3xl'>110</Text>
                <Text className='text-white'>/150</Text>
              </View>
              <View className='flex flex-col items-center'>
                <Text className='text-white font-semibold'>Pages Read this week</Text>
                <Text className='text-white mt-3'>40 pages left</Text>
                <Text className='text-gray-400'>3 days left</Text>
              </View>
            </View>
          </View>
        )}

        <View className='flex flex-col w-full'>
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
        </View>
        
        <View className='flex flex-col'>
          
        </View>

        <View className='w-full flex flex-col'>
          <Text className='text-2xl m-5 text-primary font-semibold'>Achievements</Text>
          <View className='flex flex-row flex-wrap gap-2 justify-center items-center'>
            {achievements.map((achievement, index) => (
              <Achievement key={achievement.id} index={index} icon={achievement.icon} title={achievement.title} description={achievement.description} />
            ))}
          </View>
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
    </ScrollView>
  )
}

export default profile