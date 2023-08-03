import {  useColorScheme, Platform, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { View, Text } from '../../components/Themed';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Link } from 'expo-router';
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import UserItem from '../../components/UserItem';
import { ThreadContext } from '../../context/thread-context';


export default function SearchScreen () {
 // Get theme 
 const currentTheme = useColorScheme();
 const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
 const textInputBackground = currentTheme === "light" ? Colors.light.textInputBackground :Colors.dark.textInputBackground
 const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text

  // Data from state 
  const {users : usersFromState, threads} = useContext(ThreadContext);


 //Data
 const [searchText, setsearchText] = useState<string>("")
 const [userList, setuserList] = useState<any>([...usersFromState])



  const searchFilter = (searchInput: string) => {

    // Check if there is an input 
    const regex = /^\s+/;
    if (regex.test(searchInput)) {
      // return if no input 
      return;
    }

    // Set the search input
    setsearchText(searchInput)

    // Filter through the data 
    setuserList(
      usersFromState.filter((userList:any) => 
        userList.username.toLowerCase().includes(searchInput.toLocaleLowerCase()) || 
        userList.firstName.toLowerCase().includes(searchInput.toLocaleLowerCase()) ||
        userList.lastName.toLowerCase().includes(searchInput.toLocaleLowerCase())
      )
    )
  }


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

    {/* Search bar  */}
    <View style={[styles.searchSection, {backgroundColor: textInputBackground}]}>

      {/* Search icon  */}
      <Ionicons style={styles.searchIcon} name="ios-search" size={18} color="#bcbcbc"/>

     {/* search text input */}
      <TextInput
          style={[styles.searchInput, {color: textColor}]}
          placeholder="Search wetroverse"
          returnKeyType="search"
          underlineColorAndroid="transparent"
          selectionColor={"#bcbcbc"}
          onChangeText={searchTerm => searchFilter(searchTerm)}
      />
    </View>

    {/* Users list  */}
    <View style={{marginTop:15}}>
      {userList.map((users: []) => (
            <UserItem 
              // @ts-ignore: Unreachable code error
              key={users.id} 
              user={users}
            />
      ))}
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
