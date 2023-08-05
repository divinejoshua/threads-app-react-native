import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Platform, useColorScheme, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import { Image } from 'expo-image';

export default function  ProfileScreen () {
    // Get theme 
    const currentTheme = useColorScheme();
    const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
    const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text


  
  return (
    // Main 
    <SafeAreaView  style={[styles.container, {backgroundColor: backgroundColor, flex: 1,}]} >
       <Stack.Screen options={{
         headerShadowVisible: false, 
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
        {/* Profile card  */}
        <View style={styles.profileCard}>

          {/* Profile Image  */}
          <View style={[styles.cardItem, { flex: 3, }]}>
            <Image 
              style={styles.profileImage}
              source={require('../../assets/images/profile.png')}
            />
          </View>

          {/* Profile stats  */}
          <View style={[styles.cardItem, { flex: 7, }]}>
              <View style={styles.profileStats}>

              {/* Followers */}
              <View style={styles.centeredView}>
                  <Link href={"/accounts/collapsible-tab"}><Text style={styles.statsHeader}>Followers</Text></Link>
                 <Text style={styles.statsText}>89.2K</Text>
              </View>

              {/* Followeing */}
              <View style={styles.centeredView}>
                <Text style={styles.statsHeader}>Following</Text>
                 <Text style={styles.statsText}>304</Text>
              </View>

              {/* Posts */}
              <View style={styles.centeredView}>
                <Text style={styles.statsHeader}>Posts</Text>
                 <Text style={styles.statsText}>554</Text>
              </View>
              </View>
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
    profileImage:{
      width: 70,
      height:70,
      borderRadius:100
    },


    // Profile stats 
    profileStats: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:10
    },
    centeredView: {
      flex: 1,
      height: 100,
      alignItems: 'center',
    },

    statsHeader:{
      color: '#bcbcbc',
      fontWeight: "600",
    },

    statsText:{
      fontWeight: "600",
      fontSize: 16,
      marginTop: 6
    },
  });
  