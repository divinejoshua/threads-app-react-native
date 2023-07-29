import {  useColorScheme, Platform, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from '../../components/Themed';
import { Stack } from 'expo-router';

export default function CreatePostScreen () {
 // Get theme 
 const currentTheme = useColorScheme();
 const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
 const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text



return (
 // Main 
 <SafeAreaView  style={[styles.container, {backgroundColor: backgroundColor, flex: 1,}]} >

      <Stack.Screen options={{ presentation: 'modal'}} />
     {/* Header text  */}
   {/* <Text style={styles.title}>New post</Text> */}

   {/* Scroll view  */}
   <ScrollView
     contentContainerStyle={{
       paddingTop: Platform.select({ android: 30 }),
       paddingHorizontal: 15,
       marginTop: 10
     }}
   >
 </ScrollView>
 </SafeAreaView>
)
}




const styles = StyleSheet.create({
 container: {
     paddingTop:20,
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
