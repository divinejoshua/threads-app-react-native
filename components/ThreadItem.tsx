import { Button, Pressable, StyleSheet, TouchableOpacity, View, useColorScheme } from "react-native";
import { Reply, Thread } from "../types/threads";
import { Image } from "expo-image";
import { Text } from "./Themed";
import Colors from "../constants/Colors";
import { timeAgo } from "../utils/timeAgo";
import { Ionicons, Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import * as Haptics from 'expo-haptics';
import { Link, router, useNavigation } from "expo-router";
import { ThreadContext } from "../context/thread-context";

interface TheradItemProps {
  thread: Thread;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";


export default function ThreadItem({ thread }: TheradItemProps): JSX.Element {


    // Get theme 
    const currentTheme = useColorScheme();
    const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor


    // Open post details
    const openPostDetaills = (threadId: string) => {
      router.push('/posts/'+threadId);
    }
  

  return (
    <Pressable style={[styles.container, {borderBottomColor: borderColor}]} onPress={() => openPostDetaills(thread.id)}>
      {/* Left side of post  */}
      <PostLeftSide {...thread} />
      
      <View style={{ flexShrink: 1, gap: 6, paddingLeft:3}}>

        {/* Post heading  */}
        <PostHeading
          name={thread.author.name}
          verified={thread.author.verified}
          createdAt={thread.createdAt}
        />

        {/* Post body  */}
        <Text style={{ marginBottom:10, fontSize: 16}}>{thread.content}</Text>

        {/* Post image  */}
        {thread.image && (
          <Image
            source={thread.image}
            style={{ width: "100%", minHeight: 300, borderRadius: 10, marginBottom:10}}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        )}

        {/* icons  */}
        <BottomIcons threadId={thread.id}/>

        {/* Post footers  */}
        <PostFooter threadId={thread.id} likesCount={thread.likesCount} repliesCount={thread.repliesCount} />
      </View>
    </Pressable>
  );
}


// Post Left side component 
function PostLeftSide(thread: Thread) {
  const currentTheme = useColorScheme();
  const borderColor = currentTheme === "light" ? "#00000020" : "#ffffff20";

  return (
    <View style={{ justifyContent: "space-between" }}>
      <Image
        source={thread.author.photo}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={500}
      />
      <View
        style={{
          borderWidth: 1,
          alignSelf: "center",
          borderColor: borderColor,
          flexGrow: 1,
        }}
      />
      <View
        style={{
          width: 20,
          alignItems: "center",
          alignSelf: "center",
          gap: 3,
        }}
      >
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            //@ts-ignore
            source={thread.replies[index - 1]?.author.photo}
            style={{ width: index * 7, height: index * 7, borderRadius: 15 }}
            placeholder={blurhash}
            contentFit="cover"
            transition={500}
          />
        ))}
      </View>
    </View>
  );
}


// Post heading component 
function PostHeading({
  name,
  createdAt,
  verified,
}: {
  name: string;
  createdAt: string;
  verified: boolean;
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
        <Text style={{ fontWeight: "600" }}>{name}</Text>
        {verified && (
          <MaterialIcons name="verified" size={14} color="#60a5fa" />
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Text style={{ color: "gray" }}>{timeAgo(createdAt)}</Text>
        <Feather name="more-horizontal" size={14} color="gray" />
      </View>
    </View>
  );
}


// Post footer component
function PostFooter({ threadId, likesCount, repliesCount }: { threadId: string, likesCount: number, repliesCount: number}) {


     
  // Get the thread
  const { threads, setThreads, updatedThreadId } = useContext(ThreadContext);
  const [likes, setlikes] = useState<number>(likesCount)
  const [replies, setreplies] = useState<number>(repliesCount)

  useEffect(() => {


    // Check for the exact thread that was updated in order to render the appropriate component only 
    if (updatedThreadId === threadId || updatedThreadId === "") {

    // Find the thread with the specified threadId
      const thread = threads.filter(post => post.id === threadId)

      // set thre values 
      setlikes(thread[0].likesCount);
      setreplies(thread[0].repliesCount);
    }
  }, [threads, threadId, updatedThreadId]);

  return (
    <Text style={{ color: "gray", marginLeft:5 }}>
      {replies} replies · {likes} likes
    </Text>
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
  const [isRetweet, setisRetweet] = useState<boolean>(false)

  // Click Like button 
  const clickLikeButton = () => {
    setisLiked((prevIsLiked) => !prevIsLiked);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).then(
      // Update like count 
      () => {updateLikeCount()}
      )
  }

  // Click on the retweet button 
  const clickRetweet = () =>{
    setisRetweet((prevIsLiked) => !prevIsLiked);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
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
    <View style={{ flexDirection: "row", alignItems: "center" }}>

      {/* Like button  */}
      <TouchableOpacity onPress={clickLikeButton} style={styles.postButtons}>
      {/* If post is liked or unliked  */}
      {isLiked ? 
        <FontAwesome name="heart" size={iconSize} color={"red"} />: 
        <FontAwesome name="heart-o" size={iconSize} color={iconColor} /> 
      }
      </TouchableOpacity>

      {/* Comment button  */}
      <TouchableOpacity style={styles.postButtons} onPress={()=> router.push('/posts/'+threadId)}>
        <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor}  />
      </TouchableOpacity>

      {/* Retweet button  */}
      <TouchableOpacity onPress={clickRetweet} style={styles.postButtons}>
      {/* If post is retweeted or not  */}
      {isRetweet ? 
        <AntDesign name="retweet" size={iconSize} color={"#10b981"} />: 
        <AntDesign name="retweet" size={iconSize} color={iconColor} />
      }
      </TouchableOpacity>


      <TouchableOpacity style={styles.postButtons}>
        <Feather name="send" size={iconSize} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: .5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postButtons: {
    width: 40, 
    height: 40, 
    justifyContent:'center', 
    alignItems: "center"
  }
});
