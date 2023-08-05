import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Platform, useColorScheme, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

export default function  ProfileScreen () {
    // Get theme 
    const currentTheme = useColorScheme();
    const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
    const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text


  
  return (
    // Main 
    <SafeAreaView  style={[styles.container, {backgroundColor: backgroundColor, flex: 1,}]} >
       <Stack.Screen options={{
         headerShadowVisible: true, 
         headerBackTitle: 'Back',
         headerTitle:'Profile',
         headerStyle: {
          backgroundColor: backgroundColor,
        },
        // Left header button
        headerLeft: () => (
          <TouchableOpacity style={{marginLeft:20}}>
             <Feather  name="globe" size={18} color={textColor}/>
          </TouchableOpacity>
   
        ),

        // Right header button
        headerRight: () => (
          <TouchableOpacity style={{marginRight:20}}>
              <Feather  name="menu" size={18} color={textColor}/>
          </TouchableOpacity>

        ),
        headerBackTitleStyle: {
          fontSize:14
        },
      }} />


      {/* Profile card view  */}
      <View style={{marginTop: -30}}>
        <View style={styles.profileCard}>
          <View style={[styles.cardItem, { flex: 3, borderWidth: 1 }]}>
            {/* Content for the first element */}
          </View>
          <View style={[styles.cardItem, { flex: 7, borderWidth: 1 }]}>
            {/* Content for the second element */}
          </View>
      </View>
    </View>
    </SafeAreaView>
  )
}




const styles = StyleSheet.create({
    container: {
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


    //Profile card view
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      // Set the container's width to take up the available space
      width: '100%',
    },
    cardItem: {
      height: 100, // Set the height as needed
    },
  });
  