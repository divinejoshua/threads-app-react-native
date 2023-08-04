import {  useColorScheme, Platform, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text } from '../../components/Themed';
import { Image } from 'expo-image';

export default function NotificationScreen () {
 // Get theme 
 const currentTheme = useColorScheme();
 const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
 const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text



return (
 // Main 
 <SafeAreaView  style={[styles.container, {backgroundColor: backgroundColor, flex: 1,}]} >
     {/* Header text  */}
  
     <Text style={styles.title}>Activity</Text>


   {/* Scroll view  */}
   {/* <ScrollView
     contentContainerStyle={{
       paddingTop: Platform.select({ android: 30 }),
       paddingHorizontal: 15,
       marginTop: 10
     }}
   >
   
 </ScrollView> */}
        <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>

          {/* Animation  */}
           <Image
            style ={styles.animationImage}
            source={require('../../assets/images/bell.gif')}
          />

          {/* Text */}
        <Text style={{fontSize:23,fontWeight : '600', marginBottom:15}}>No notice right now</Text>
        <Text style={{fontSize:16, color: "#bcbcbc"}}>You are up to date</Text>
        </View>
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

 animationImage: {
  width: 70, 
  height:70, 
  borderRadius: 100,
  marginBottom:20,
 },
});
