import ProgressBar from '@/components/ProgressBar'
import { useUser } from '@/contexts/UserContext'
import { useBooks } from '@/hooks/useBooks'
import { useSaveBook } from '@/hooks/useSaveBook'
import { supabase } from '@/utils/supabaseClient'
import { router, useLocalSearchParams } from 'expo-router'
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Heart,
  Send
} from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'

interface MovieInfoProps {
  description: string;
  language: string;
  publisher: string;
  pageCount: number;
  rating: Float;
  categories: Array<string>;
}

const MovieInfo = ({ description, language, publisher, pageCount, rating, categories }: MovieInfoProps) => {
  
  return (
      <View className='w-[90%] items-center justify-center mt-5 flex flex-col'>
          <Text className='text-white text-center'>
           {description || "Description of this book is currently not available"}
          </Text>
          <View className='w-full flex flex-row gap-2 mt-5 flex-wrap'>
            {categories.map((item) => (
              <Text key={item} className='bg-gray-200 p-2 rounded-xl text-sm text-black'>{item}</Text>
            ))}
          </View>
          <View className='w-[90%] justify-center mt-5 flex flex-col'>
            <Text className='text-gray-400 text-lg'>Language: {language}</Text>
            <Text className='text-gray-400 text-lg'>Publishing Agency: {publisher}</Text>
            <Text className='text-gray-400 text-lg'>Total Pages: {pageCount}</Text>
            <Text className='text-gray-400 text-lg'>⭐{rating}</Text> 
          </View>
       </View>
  )
}

interface CommentSectionProps {
  comments: any;
  setComments: any;
  avatar: string;
}

const CommentSection = ({comments , setComments, avatar, newComment, setNewComment, onPost}: any) => {
  return (
    <View className='w-full mt-5 flex flex-col items-center justify-center'>
            <View className='w-[90%] h-[230px] bg-secondary rounded-xl justify-center items-center'>
              <View className='w-full flex flex-row rounded-xl '>
                <Image source={{uri: avatar}} style={{ width: 32, height: 32, borderRadius: 16,marginTop:15, marginLeft:7, marginRight:7 }} />
                <TextInput
                  placeholder='Write your thoughts here...' 
                  placeholderTextColor="white"
                  multiline
                  className='text-white bg-gray-500 w-[80%] h-[130px] mt-5 rounded-xl p-2'
                  numberOfLines={4}
                  textAlignVertical='top'
                  value={newComment}
                  onChangeText={setNewComment}
                  />
              </View>
              <TouchableOpacity 
                className='bg-primary w-[80%] ml-7 h-[40px] rounded-xl flex flex-row gap-3 items-center justify-center mt-3'
                onPress={onPost}
              >
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
  const { userData, loading:userLoading } = useUser() ?? {};
  const avatar = userData?.profile_url || "https://avatar.iran.liara.run/public/18";
  const { id , pagesRead } = useLocalSearchParams();
  const {books , fetching } = useBooks({type: "bookId" , query:id});
  const {
    title,
    authors = [],
    publisher = "Unknown publisher",
    publishedDate = "Unknown date",
    description = "No description available",
    categories = [],
    averageRating = 1.3,
    pageCount = 0,
    language = "en",
    imageLinks = {},
  } = books.length > 0 ? books[0].volumeInfo : {};

  

  const [savedData, setSavedData] = useState<{ data: any; error: any }>({ data: null, error: null });
  const { saveBook, unsaveBook, isSaved, loading } = useSaveBook({
      googleId: id,
      title: title,
      description: description,
      author: authors[0],
      genre: categories[0],
      rating: averageRating,
      total_pages: pageCount,
      cover: imageLinks?.thumbnail,
      publisher: publisher,
      year: publishedDate,
      language: language
    });
  const handlePress = () => {
    if (isSaved || savedData.data) {
      unsaveBook();
      setSavedData({data:"", error:""})
    } else {
      console.log("check 0")
      saveBook();
    }
  };

  React.useEffect(() => {
    const fetchSavedData = async () => {
      if (!userData?.id || !id) return;
      const { data, error } = await supabase
        .from("SAVED")
        .select("userId")
        .eq("userId", userData.id)
        .eq("bookId", id)
        .maybeSingle();
        console.log(data)
      setSavedData({ data, error });
    };
    fetchSavedData();
  }, [userData?.id, id]);

  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from('COMMENTS')
        .select(`
          id,
          content,
          created_at,
          USERS (
            id,
            name,
            profile_url
          )
        `)
        .eq('book_id', id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        const formattedComments = data.map(comment => ({
          id: comment.id,
          user: comment.USERS?.name,
          avatar: comment.USERS?.profile_url,
          comment: comment.content,
          likes: 0,
          isLiked: false,
          timestamp: new Date(comment.created_at).toLocaleDateString()
        }));
        setComments(formattedComments);
      }
    };

    fetchComments();
  }, [id]);

  const handlePostComment = async () => {
    if (!newComment.trim() || !userData?.id || !id) return;

    const { data, error } = await supabase
      .from('COMMENTS')
      .insert([{ content: newComment, user_id: userData.id, book_id: id as string }])
      .select(`
        id,
        content,
        created_at,
        USERS (
          id,
          name,
          profile_url
        )
      `)
      .single();

    if (error) {
      console.error('Error posting comment:', error);
    } else if (data) {
      const postedComment = {
        id: data.id,
        user: data.USERS?.name,
        avatar: data.USERS?.profile_url,
        comment: data.content,
        likes: 0,
        isLiked: false,
        timestamp: new Date(data.created_at).toLocaleDateString()
      };
      setComments([postedComment, ...comments]);
      setNewComment(""); 
    }
  };

  return (
    <ScrollView className="bg-background flex-1 flex-col" contentContainerStyle={{alignItems:"center" , paddingBottom: selectedTab == "comments"? 400:100}}>
      {fetching? 
        <View className='h-full w-full mt-10'>
          <ActivityIndicator size={"large"} color={"#F07900"}/>
        </View>
      :
      <>
        <View className='w-[95%] flex flex-row mt-10 bg-background justify-between items-center'>
            <TouchableOpacity onPress={()=>router.back()}>
                <ArrowLeft size={32} color={"#F07900"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress}>
              { loading? <ActivityIndicator size={"large"}  color={"#F07900"} className='mt-2'/>: isSaved || savedData.data ?
                <BookmarkCheck
                  size={32} color="#F07900" />:
                <Bookmark size={32} color="#F07900"/>
    }
            </TouchableOpacity>
        </View>
        <View className='w-full mt-5 items-center justify-center'>
          <Image source={{uri:imageLinks?.thumbnail}} resizeMode="stretch" style={{height: 400, width:"90%", borderRadius: 10}} />
        </View>
        <View className='w-full justify-center items-center text-center'>
          <Text className='text-white font-semibold text-3xl text-center mt-3'>{title}</Text>
          <Text className='text-gray-400 text-lg'>{authors}</Text>
          <Text className='text-gray-400 text-lg'>publishing year:{publishedDate}</Text>
        </View>

        <View className='w-full flex justify-center items-center mt-3'>
          <TouchableOpacity className='bg-primary w-[90%] py-3 flex items-center rounded-xl'>
            <Text className='text-xl text-white'>{pagesRead > 0 ? "Continue Reading" : "Start Reading"}</Text>
          </TouchableOpacity>
          {pagesRead > 0 && 
          <>
            <ProgressBar progress={0.69} />
            <Text className='text-gray-400 text-sm mt-1'>{pagesRead/pageCount}% completed</Text>
          </>
          }
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
          { selectedTab === 'info' && <MovieInfo 
                                        description={description}
                                        publisher={publisher}
                                        pageCount={pageCount}
                                        rating={averageRating}
                                        language={language}
                                        categories={categories}
                                        />}
          { selectedTab === 'comments' && <CommentSection 
                                            comments={comments} 
                                            setComments={setComments} 
                                            avatar={avatar} 
                                            newComment={newComment}
                                            setNewComment={setNewComment}
                                            onPost={handlePostComment}
                                          />}
          
        </View>
      </>
}
        
    </ScrollView>
  )
}

export default MovieDisplay