import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Platform, useColorScheme, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Colors from '../../constants/Colors';
import { Image } from 'expo-image';

export default function  ProfileScreen () {
    // Get theme 
    const currentTheme = useColorScheme();
    const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
    const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
    const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor


    const [isFollowing, setisFollowing] = useState<Boolean>(false)

    // follow user / unfollow user 
    const followUser = () =>{
      setisFollowing((prevIsLiked) => !prevIsLiked);

      // Only vibrate when the user is following 
      if(isFollowing===false){
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    }


  
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
          <View style={[{ flex: 3, }]}>
            <Image 
              style={styles.profileImage}
              source={require('../../assets/images/profile.png')}
            />
          </View>

          {/* Profile stats  */}
          <View style={[{ flex: 7, }]}>
              <View style={styles.profileStats}>

              {/* Followers */}
              <View style={styles.centeredView}>
                  <Link href={"/accounts/collapsible-tab"}><Text style={styles.statsHeader}>Followers</Text></Link>
                 <Text style={styles.statsText}>16.2M</Text>
              </View>

              {/* Followeing */}
              <View style={styles.centeredView}>
                <Text style={styles.statsHeader}>Following</Text>
                 <Text style={styles.statsText}>1,324</Text>
              </View>

              {/* Posts */}
              <View style={styles.centeredView}>
                <Text style={styles.statsHeader}>Posts</Text>
                 <Text style={styles.statsText}>10.1K</Text>
              </View>
              </View>
          </View>

        </View>


    {/* User Info */}
        <View style={{marginTop:20}}>

            {/* Full name  */}
            <Text style={{fontSize: 17, fontWeight:'600', }}>Eren Yeager <MaterialIcons name="verified" size={14} color="#60a5fa" /></Text> 

            {/* Username  */}
            <Text style={{marginTop:5, color:'#aaaaaa', }}>@yeager</Text>

            {/* Bio  */}
            <Text style={{marginTop:5, lineHeight:23, letterSpacing:.1 }}>
                𝐸𝓈𝓉. 1894 ❤️ Love This City! 🏆 x1 UCL winners, 9x League champions, x1 WSL champions | 💬 Fan support: <Text style={{color:'#60a5fa'}}>@wetroverse</Text>
            </Text>
        </View>

    {/* Action buttons  */}

      <View style={styles.actionButtons}>

        {/* If following  */}
        {isFollowing ?

          //  If is following  
          <Pressable onPress={()=> followUser()}  style={[styles.followingButton, {borderColor: borderColor}]}>
            <Text style={styles.followButtonText}>Following</Text>
          </Pressable>
          :
          // If logged in user is not following
          <Pressable onPress={()=> followUser()} style={[styles.followButton, {backgroundColor: "#3b82f6"}]}>
              <Text style={[styles.followButtonText,{color:"#fff"}]}>Follow</Text>
          </Pressable>
        }

        {/* Message button  */}
        <Pressable style={[styles.followingButton, {borderColor: borderColor}]}>
          <Text style={{fontWeight:'600'}}>Message</Text>
        </Pressable>

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
      width: '100%',
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
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
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

    actionButtons:{
      marginTop:20, 
      flexDirection: 'row',
      width: '100%',
      gap:10,
    },

    followingButton: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 7,
      flex:5,
      borderWidth: 1,

    },
    followButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      flex:5,
      paddingVertical: 8,
      borderRadius: 7,

    },
    followButtonText: {
      fontWeight:'600'
    },
  });
  