import * as React from "react";
import { useRef, useContext, useState, useEffect } from "react";
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import Lottie from "lottie-react-native";
import { ThreadContext } from "../../context/thread-context";
import ThreadItem from "../../components/ThreadItem";
import { Text, View } from "../../components/Themed";

export default function TabOneScreen() {
  const animationRef = useRef<Lottie>(null);
  const threads = useContext(ThreadContext);
  const [isRefreshing, setisRefreshing] = useState(false) 


  // Loading functionality 
  const LoadData = () => {
    // Set loading to true 
    setisRefreshing(true)

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
    <SafeAreaView>
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
    <View style={{
      flex: 1, // Make sure the parent View takes the full available space
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
      backgroundColor: 'yellow', // Optional: Add a background color to visualize the View's boundary
    }}>

    </View>
       

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
