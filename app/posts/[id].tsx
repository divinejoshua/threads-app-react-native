import { Stack, useSearchParams } from 'expo-router'
import { View, Text } from '../../components/Themed'
import React, { useContext, useEffect, useState } from 'react'
import { Thread } from '../../types/threads';
import { ThreadContext } from '../../context/thread-context';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Platform, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { timeAgo } from '../../utils/timeAgo';
import Colors from '../../constants/Colors';



const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";




export default function PostItem(): JSX.Element {
   // @ts-ignore: Unreachable code error
  const { id }  = useSearchParams()

  const {threads } = useContext(ThreadContext);

  const [threadPost, setthreadPost] = useState<Thread>(Object)
  const [isRefreshing, setisRefreshing] = useState(false) 

  // Get theme 
  const currentTheme = useColorScheme();
  const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
  const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
  
  
  

  // Loading functionality 
  const LoadData = () => {
    // Set loading to true 
    setisRefreshing(true)

    // Set Loading back to false after a few seconds 
    setTimeout(() => {
      setisRefreshing(false);
    }, 2000);
  }


  // Set the post thread
  const [postThread, setpostThread] = useState({})

  useEffect(() => {
    // Set loading to true 
    setthreadPost(threads.filter(post => post.id === id)[0])
    console.log(threads.filter(post => post.id === id)[0])

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
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            // tintColor={"transparent"}
            onRefresh={LoadData}
          />
        }
      >
        {threadPost.id && 
          <PostHeading
            name={threadPost.author.name}
            verified={threadPost.author.verified}
            createdAt={threadPost.createdAt}
            authorProfile = { threadPost.author.photo }
          /> 
        
        }
       

      
       {/* Post heading  */}
     

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