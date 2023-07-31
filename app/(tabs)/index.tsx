import { useRef, useContext, useState, useEffect } from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ThreadContext } from "../../context/thread-context";
import ThreadItem from "../../components/ThreadItem";
import { Text, View } from "../../components/Themed";
import { Image } from "expo-image";
import Colors from "../../constants/Colors";
import useChooseFile from "../../utils/choose-file";


export default function TabOneScreen() {
    const {threads, setThreads} = useContext(ThreadContext);
    const [isRefreshing, setisRefreshing] = useState(false) 

    // Get theme 
    const currentTheme = useColorScheme();
    const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background

    const { getPosts } = useChooseFile()
    
    
  
  


  // Loading functionality 
  const LoadData = () => {
    // Set loading to true 
    setisRefreshing(true)

    // on refresh get new posts from choose file hook
    getPosts()

    // Set Loading back to false after a few seconds 
    setTimeout(() => {
      setisRefreshing(false);
    }, 2000);
  }

  useEffect(() => {
    // Set loading to true 
    setisRefreshing(true)

    // Set Loading back to false after a few seconds 
    setTimeout(() => {
      setisRefreshing(false);
    }, 3000);

    
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: backgroundColor}}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
          paddingHorizontal: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            // tintColor={"transparent"}
            onRefresh={LoadData}
          />
        }
      >

        {/* The logo  */}
    
      <Image
        source={require('../../assets/images/adaptive-icon.png')}
        style={{ width: 70, height: 70, borderRadius: 15, alignSelf: 'center',  marginBottom : 0, marginTop : 10 }}/>


        {/* Loop through posts  */}
        {threads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
