import {  useColorScheme, Platform, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { View, Text } from '../../components/Themed';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Link } from 'expo-router';
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';


export default function SearchScreen () {
 // Get theme 
 const currentTheme = useColorScheme();
 const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
 const textInputBackground = currentTheme === "light" ? Colors.light.textInputBackground :Colors.dark.textInputBackground
 const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text




return (
 // Main 
 <SafeAreaView  style={[styles.container, {backgroundColor: backgroundColor, flex: 1,}]} >
   {/* Scroll view  */}
   <ScrollView
     contentContainerStyle={{
       paddingTop: Platform.select({ android: 30 }),
       paddingHorizontal: 15,
     }}
   >
    {/* Header text  */}
    <Text style={styles.title}>Search</Text>

    <View style={[styles.searchSection, {backgroundColor: textInputBackground}]}>
    <Ionicons style={styles.searchIcon} name="ios-search" size={18} color="#bcbcbc"/>
    <TextInput
        style={[styles.searchInput, {color: textColor}]}
        placeholder="Search wetroverse"
        returnKeyType="search"
        underlineColorAndroid="transparent"
         selectionColor={"#bcbcbc"}
    />
</View>

    </ScrollView>
    </SafeAreaView>
)
}




const styles = StyleSheet.create({
 container: {
     paddingTop:20,
     paddingLeft:5,
     paddingRight:5,
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
 
 searchSection: {
  flexDirection: 'row',
  width: '100%',
  marginTop:20,
  borderRadius:10,
  paddingLeft:10
},

searchIcon: {
  marginTop:10,
}, 

searchInput: {
  width: '100%',
  height: 40,
  fontSize:16,
  paddingLeft:7,
  paddingRight:7,
  borderRadius:7,
},


});
