import ProgressBar from '@/components/ProgressBar'
import { images } from '@/constants/images'
import { router } from 'expo-router'
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Heart,
  Send
} from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const MovieInfo = () => {
  return (
      <View className='w-[90%] items-center justify-center mt-5 flex flex-col'>
          <Text className='text-white text-center'>
            The story follows Harry, an orphaned boy who discovers he's a wizard and is invited to attend Hogwarts School of Witchcraft and Wizardry. 
            He learns of his parents' murder by the evil Lord Voldemort and becomes entangled in a battle against him. 
          </Text>
          <View className='w-full flex flex-row gap-2 mt-5 flex-wrap'>
            <Text className='bg-gray-200 p-2 rounded-xl text-sm text-black'>Novel</Text>
            <Text className='bg-gray-200 p-2 rounded-xl text-sm text-black'>Fiction</Text>
          </View>
       </View>
  )
}

interface CommentSectionProps {
  comments: any;
  setComments: any;
  avatar: string;
}

const CommentSection = ({comments , setComments, avatar}: CommentSectionProps) => {
  return (
    <View className='w-full mt-5 flex flex-col items-center justify-center'>
            <View className='w-[90%] h-[230px] bg-secondary rounded-xl justify-center items-center'>
              <View className='w-full flex flex-row rounded-xl '>
                <Image source={{uri: avatar}} style={{ width: 32, height: 32, borderRadius: 16,marginTop:15, marginLeft:7, marginRight:7 }} />
                <TextInput
                  placeholder='Write your thoughts here...' 
                  placeholderTextColor="white"
                  multiline
                  className='text-white bg-gray-500 w-[80%] h-[130px] mt-5 rounded-xl'
                  numberOfLines={4}
                  textAlignVertical='top'
                  />
              </View>
              <TouchableOpacity className='bg-primary w-[80%] ml-7 h-[40px] rounded-xl flex flex-row gap-3 items-center justify-center mt-3'>
                <Send size={25} color="white"/>
                <Text className='text-white text-lg'>Post Comment</Text>
              </TouchableOpacity>
              
            </View>
            {comments.map((comment: any) => (
                <View key={comment.id} className='w-full flex flex-row items-center justify-center gap-3 mt-3'>
                  <View className='w-[90%] bg-gray-700 p-3 rounded-xl flex flex-row gap-2'>
                    <View className='w-[10%] items-center'>
                      <Image source={{uri: comment.avatar}} style={{ width: 32, height: 32, borderRadius: 16 }} />
                    </View>
                    <View className='w-[90%]'>
                      <Text className='text-white font-semibold'>{comment.user}</Text>
                      <Text className='text-gray-300'>{comment.comment}</Text>
                      <View className='flex flex-row items-center justify-between mt-2'>
                        <Text className='text-gray-400 text-xs'>{comment.timestamp}</Text>
                        <TouchableOpacity 
                          className='flex flex-row items-center gap-1'
                          onPress={() => {
                            const updatedComments = comments.map((c: Comment) => 
                            c.id === comment.id ? {...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1} : c
                            );
                          setComments(updatedComments);
                        }}>
                          <Heart size={20} color={comment.isLiked ? "#F07900" : "#999"} />
                          <Text className={`text-sm ${comment.isLiked ? 'text-primary' : 'text-gray-400'}`}>{comment.likes}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))}

          </View>
  )
}

const MovieDisplay = () => {
  const [selectedTab, setSelectedTab] = React.useState('info');
  const [saved , setSaved] = useState(false);
  const avatar = "https://avatar.iran.liara.run/public/18";
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "WizardFan92",
      avatar: "https://avatar.iran.liara.run/public/1",
      comment: "This book is absolutely magical! The flying car scene had me on the edge of my seat. Rowling's world-building is incredible.",
      likes: 12,
      isLiked: false,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: "BookwormHermione",
      avatar: "https://avatar.iran.liara.run/public/13",
      comment: "I love how this book explores themes of friendship and courage. Harry's growth throughout the story is so well written.",
      likes: 8,
      isLiked: true,
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      user: "PotterHead2024",
      avatar: "https://avatar.iran.liara.run/public/11",
      comment: "The Chamber of Secrets mystery kept me guessing until the very end! Tom Riddle's reveal was brilliant.",
      likes: 15,
      isLiked: false,
      timestamp: "1 day ago"
    }
  ]);
  return (
    <ScrollView className="bg-background flex-1 flex-col" contentContainerStyle={{alignItems:"center" , paddingBottom: selectedTab == "comments"? 400:100}}>
        <View className='w-[95%] flex flex-row mt-10 bg-background justify-between items-center'>
            <TouchableOpacity onPress={()=>router.back()}>
                <ArrowLeft size={32} color={"#F07900"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSaved(!saved)}>
              { saved ?
                <BookmarkCheck
                  size={32} color="#F07900" />:
                <Bookmark size={32} color="#F07900"/>
    }
            </TouchableOpacity>
        </View>
        <View className='w-full mt-5 items-center justify-center'>
          <Image source={images.HP} resizeMode="stretch" style={{height: 400, width:"90%", borderRadius: 10}} />
        </View>
        <View className='w-full justify-center items-center text-center'>
          <Text className='text-white font-semibold text-3xl text-center mt-3'>Harry Potter</Text>
          <Text className='text-gray-400 text-lg'>JK Rowling</Text>
        </View>

        <View className='w-full flex justify-center items-center mt-3'>
          <TouchableOpacity className='bg-primary w-[90%] py-3 flex items-center rounded-xl'>
            <Text className='text-xl text-white'>Continue Reading</Text>
          </TouchableOpacity>
          <ProgressBar progress={0.69} />
          <Text className='text-gray-400 text-sm mt-1'>69% completed</Text>
        </View>
        <View className='w-full items-center justify-center mt-2'>
          <View className='w-[90%] bg-secondary flex flex-row justify-around py-3 rounded-xl'>
            <TouchableOpacity 
            className={`${selectedTab == "info"?"bg-primary":"bg-secondary"} w-[45%] py-2 items-center rounded-xl`}
            onPress={() => setSelectedTab('info')}
            >
              <Text className='text-white'>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            className={`${selectedTab == "comments"?"bg-primary":"bg-secondary"} w-[45%] py-2 items-center rounded-xl`}
            onPress={() => setSelectedTab('comments')}
            >
              <Text className='text-white'>Comments</Text>
            </TouchableOpacity>
          </View>
          { selectedTab === 'info' && <MovieInfo />}
          { selectedTab === 'comments' && <CommentSection comments={comments} setComments={setComments} avatar={avatar} />}
          
        </View>
        
    </ScrollView>
  )
}

export default MovieDisplay