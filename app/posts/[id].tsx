import { Link, Stack, router, useSearchParams } from 'expo-router'
import { View, Text } from '../../components/Themed'
import React, { useContext, useEffect, useState } from 'react'
import { Thread } from '../../types/threads';
import { ThreadContext } from '../../context/thread-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform, Pressable, SafeAreaView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { timeAgo } from '../../utils/timeAgo';
import Colors from '../../constants/Colors';
import * as Haptics from 'expo-haptics';
import ReplyItem from '../../components/ReplyItem';




const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";




export default function PostItem(): JSX.Element {
   // @ts-ignore: Unreachable code error
  const { id }  = useSearchParams() // get ID of the page from search params

  const {threads } = useContext(ThreadContext);

  const [threadPost, setthreadPost] = useState<Thread>(Object)

  // Get theme 
  const currentTheme = useColorScheme();
  const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
  const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
  const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor



  useEffect(() => {
    // Set loading to true 
    setthreadPost(threads.filter(post => post.id === id)[0])
  }, []);


  return (
    <SafeAreaView  style={{backgroundColor: backgroundColor, flex: 1,}} >
      <Stack.Screen options={{ title: 'Thread',
         headerShadowVisible: false, 
         headerBackTitle: 'Back',
         headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTintColor: textColor,
        headerBackTitleStyle: {
          fontSize:14
        },
         
      }} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
          paddingHorizontal: 15,
          marginTop: 10
        }}
       
      >
        {threadPost.id ? 
          <View style={[styles.post,  {borderBottomColor: borderColor}]}>
            <PostHeading
              name={threadPost.author.name}
              verified={threadPost.author.verified}
              createdAt={threadPost.createdAt}
              authorProfile = { threadPost.author.photo }
            /> 

            <Text style={{ marginTop:15, marginBottom:15, fontSize: 16}}>{threadPost.content}</Text>

            {/* Post image  */}
            {threadPost.image && (
              <Image
                source={threadPost.image}
                style={{ width: "100%", minHeight: 300, borderRadius: 10, marginBottom:10}}
                placeholder={blurhash}
                contentFit="cover"
                transition={500}
              />
            )}


            {/* icons  */}
            <BottomIcons threadId={threadPost.id}/>

            {/* Post footers  */}
            <PostFooter threadId={threadPost.id} />

          </View>
        : ""
        }


       

      
      {threadPost.replies && threadPost.replies.map((replies) => (
        <ReplyItem key={replies.id} thread={replies} />
        ))}
     

      </ScrollView>
    </SafeAreaView>
  )
}


// Post heading component 
function PostHeading({
  name,
  createdAt,
  verified,
  authorProfile,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
  authorProfile: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
        
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {/* Left side of post  */}
          <Image
            source={authorProfile}
            style={styles.image}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
      />

      {/* Name of user */}
        <Text style={{ fontWeight: "600" }}>{name}</Text>
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )}
      </View>

      {/* Right side  */}
      <View style={{ flexDirection: "row", alignSelf: "center", gap: 10 }}>
        <Text style={{ color: "gray" }}> {timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
}


// Post footer component
function PostFooter({ threadId }: { threadId: string }) {


     
  // Get the thread
  const { threads, setThreads, updatedThreadId } = useContext(ThreadContext);
  const [likes, setlikes] = useState<number>(0)
  const [replies, setreplies] = useState<number>(0)

  useEffect(() => {

    // Find the thread with the specified threadId
    const thread = threads.filter(post => post.id === threadId)

    // Check for the exact thread that was updated in order to render the appropriate component only 
  
      setlikes(thread[0].likesCount);
      setreplies(thread[0].repliesCount);
  }, [threads, threadId, updatedThreadId]);

  return (
    <Pressable  onPress={() => router.push({ pathname: "/posts/likes", params: { id: threadId } })}>
      <Text style={{ color: "gray", marginLeft:5 }}>
        {replies} replies · {likes} likes 
      </Text>
    </Pressable>
  );
}


// Action icons components 
function BottomIcons({threadId}: { threadId: string }) {

  // Get threads from context API 
  const {threads, setThreads, updatedThreadId, setUpdatedThreadId} = useContext(ThreadContext);


  const iconSize = 21;

  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "light" ? Colors?.light.text :Colors.dark.text;

  const [isLiked, setisLiked] = useState<boolean>(false)

  // Click Like button 
  const clickLikeButton = () => {
    setisLiked((prevIsLiked) => !prevIsLiked);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).then(
      // Update like count 
      () => {updateLikeCount()}
      )
  }

  // Updating the like count function 
  const updateLikeCount = async ()=>{

      // Set the updated thread id_ID to threadId 
      setUpdatedThreadId(threadId)

      // Get the new data and update it
      let newData = [...threads]  
      let post = newData.filter(post => post.id === threadId)
      isLiked ? post[0].likesCount = post[0].likesCount - 1 : post[0].likesCount = post[0].likesCount + 1 
      setThreads(newData)
  }



  


  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom:2, }}>

      {/* Like button  */}
      <TouchableOpacity onPress={clickLikeButton} style={styles.postButtons}>
      {/* If post is liked or unliked  */}
      {isLiked ? 
        <FontAwesome name="heart" size={iconSize} color={"red"} />: 
        <FontAwesome name="heart-o" size={iconSize} color={iconColor} /> 
      }
      </TouchableOpacity>

      {/* Comment button  */}
      <TouchableOpacity style={styles.postButtons}>
        <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor}  />
      </TouchableOpacity>

      {/* Retweet button  */}
      <TouchableOpacity style={styles.postButtons}>
        <AntDesign name="retweet" size={iconSize} color={iconColor} />
      </TouchableOpacity>

      {/* Share button  */}
      <TouchableOpacity style={styles.postButtons}>
        <Feather name="send" size={iconSize} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}



// // Post footer component
// function ThreadReply({ threadId }: { threadId: string }) {


     
//   // Get the thread
//   const { threads, setThreads, updatedThreadId } = useContext(ThreadContext);
//   const [likes, setlikes] = useState<number>(0)
//   const [replies, setreplies] = useState<number>(0)

//   useEffect(() => {

//     // Find the thread with the specified threadId
//     const thread = threads.filter(post => post.id === threadId)

//     // Check for the exact thread that was updated in order to render the appropriate component only 
  
//       setlikes(thread[0].likesCount);
//       setreplies(thread[0].repliesCount);
//   }, [threads, threadId, updatedThreadId]);

//   return (
//     <Text style={{ color: "gray", marginLeft:5 }}>
//       {replies} replies · {likes} likes
//     </Text>
//   );
// }


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: .5,
  },

  post:{
    paddingBottom: 20,
    borderBottomWidth: .5,
  },

  image: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  postButtons: {
    width: 40, 
    height: 40, 
    justifyContent:'center', 
    alignItems: "center"
  }
});