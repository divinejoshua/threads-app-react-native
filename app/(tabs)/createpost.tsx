import {  useColorScheme, Platform, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from '../../components/Themed';
import { Stack, router } from 'expo-router';

export default function CreatePostScreen () {
 // Get theme 
 const currentTheme = useColorScheme();
 const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
 const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text

//  Data 
 const [isLoading, setisLoading] = useState<boolean>(false)
const [threadMessage, setthreadMessage] = useState<string>("")


// Go back function 
const goBack = ()=>{
  // Set threadmessage to empty string before going bac 
  setthreadMessage("")
  // router.back()
}

//  Send post function 
 const sendPost = () =>{

  // Set loading to default 
  setisLoading(false)

  // Set loading to true after few seconds and go back
  setTimeout(() => {
    setisLoading(true);
    router.back()
  }, 2000);



 }

return (
 // Main 
 <SafeAreaView  style={[styles.container, {backgroundColor: backgroundColor, flex: 1,}]} >

      <Stack.Screen options={{
         headerShadowVisible: true, 
         headerBackTitle: 'Back',
         headerTitle:'Thread',
         headerStyle: {
          backgroundColor: backgroundColor,
        },
        // Left header button
        headerLeft: () => (
          <TouchableOpacity onPress={()=> goBack()} style={{marginLeft:20}}>
            <Text style={{fontWeight:'600', fontSize:16}}>Cancel</Text>
          </TouchableOpacity>
   
        ),

        // Right header button
        headerRight: () => (
          <TouchableOpacity onPress={()=> sendPost()} style={{marginRight:20}}>
            <Text style={{fontWeight:'600', color:'#3b82f6', fontSize:16}}>Post</Text>
          </TouchableOpacity>

        ),
        headerBackTitleStyle: {
          fontSize:14
        },
      }} />
   
   {/* Text Input  */}
   <TextInput
    multiline={true}
    style={{ height:200, fontSize: 17, textAlignVertical: 'top', color: textColor}}
    placeholder='What is happening...'
    autoFocus={true}
    selectionColor={"#bcbcbc"}
    maxLength={140}
    onChangeText={text => setthreadMessage(text)}
    editable={!isLoading}

    />

    <Text style={{marginTop:10, color:'#777', alignSelf:"flex-end"}}>{threadMessage.length} / 140</Text>
 </SafeAreaView>
)
}




const styles = StyleSheet.create({
 container: {
     paddingTop:-30,
     paddingLeft:20,
     paddingRight:20,
 },
 title: {
   fontSize: 30,
   fontWeight: 'bold',
 },
 separator: {
   marginVertical: 30,
   height: 1,
   width: '80%',
 },
});
