import * as React from "react";
import { useRef, useContext, useState } from "react";
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
  const [isLoading, setisLoading] = useState(false) 


  // Loading functionality 
  const LoadData = () => {
    // Set loading to true 
    setisLoading(true)

    // Set Loading back to false after a few seconds 
    setTimeout(() => {
      setisLoading(false);
    }, 3000);
  }

  React.useEffect(() => {
    animationRef.current?.play();
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
            refreshing={true}
            // tintColor={"transparent"}
            onRefresh={() => animationRef.current?.play()}
          />
        }
      >
<View style={{
   flex: 1, // Make sure the parent View takes the full available space
   justifyContent: 'center', // Center vertically
   alignItems: 'center', // Center horizontally
   backgroundColor: 'yellow', // Optional: Add a background color to visualize the View's boundary
}}>

   {/* The lottie logo animation on refresh  */}
   {/* <Lottie
          ref={animationRef}
          source={require("../../lottie-animations/threads.json")}
          style={{
            width: 90,
            height: 90,
            // marginLeft: '18%',
          }}
          loop={false}
          onAnimationFinish={() => animationRef.current?.pause()}
        /> */}
        {/* <Text>Loading</Text> */}
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
