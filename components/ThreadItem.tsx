import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { Thread } from "../types/threads";
import { Image } from "expo-image";
import { Text } from "./Themed";
import Colors from "../constants/Colors";
import { timeAgo } from "../utils/timeAgo";
import { Ionicons, Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

interface TheradItemProps {
  thread: Thread;
}

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";


export default function ThreadItem({ thread }: TheradItemProps): JSX.Element {


    // Get theme 
    const currentTheme = useColorScheme();
    const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor
  

  return (
    <Pressable style={[styles.container, {borderBottomColor: borderColor}]}>

      {/* Left side of post  */}
      <PostLeftSide {...thread} />
      
      <View style={{ flexShrink: 1, gap: 6,}}>

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
        {/* @ts-ignore */}
        <BottomIcons />

        {/* Post footers  */}
        <PostFooter replies={thread.repliesCount} likes={thread.likesCount} />
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
        <Text style={{ fontWeight: "500" }}>{name}</Text>
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
function PostFooter({ replies, likes }: { replies: number; likes: number }) {
  return (
    <Text style={{ color: "gray", marginTop:10 }}>
      {replies} replies · {likes} likes
    </Text>
  );
}


// Action icons components 
function BottomIcons() {
  const iconSize = 21;

  const currentTheme = useColorScheme();
  const iconColor = currentTheme === "light" ? Colors?.light.text :Colors.dark.text;

  


  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
      <FontAwesome name="heart-o" size={iconSize} color={iconColor} />
      <Ionicons name="chatbubble-outline" size={iconSize} color={iconColor}  />
      <AntDesign name="retweet" size={iconSize} color={iconColor} />
      <Feather name="send" size={iconSize} color={iconColor} />
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
});
