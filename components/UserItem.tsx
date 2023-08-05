import { StyleSheet, useColorScheme } from 'react-native';
import { View, Text } from '../components/Themed'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import * as Haptics from 'expo-haptics';


export default function UserItem({ user } : { user : object | any}) {

    const currentTheme = useColorScheme();
    const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
    const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
    const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor
    const [isFollowing, setisFollowing] = useState<Boolean>(false)

    // follow user / unfollow user 
    const followUser = () =>{
      setisFollowing((prevIsLiked) => !prevIsLiked);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }


  return (
    <View style={[styles.container]}>
        <Image source={user.image} style={[styles.profileImage, {borderColor: borderColor}]} />
        <View style={styles.userInfo}>
          <Text style={styles.fullName}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.username}>{user.username}</Text>
        </View>

        {isFollowing ?

            //  If is following  
            <TouchableOpacity onPress={()=> followUser()}  style={[styles.followingButton, {borderColor: borderColor}]}>
              <Text style={styles.followButtonText}>following</Text>
            </TouchableOpacity>
        :
            // If logged in user is not following
            <TouchableOpacity onPress={()=> followUser()} style={[styles.followButton, {backgroundColor: "#3b82f6"}]}>
                <Text style={[styles.followButtonText,{color:"#fff"}]}>follow</Text>
            </TouchableOpacity>
         }
  </View>
);
  
}


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
        borderWidth: 1,
    },
    userInfo: {
      flex: 1,
      marginLeft: 10,
    },
    fullName: {
      fontWeight: '600',
      fontSize: 16,
    },
    username: {
      color: 'gray',
    },
    followingButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      paddingVertical: 8,
      borderRadius: 7,
      borderWidth: 1,

    },
    followButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      paddingVertical: 8,
      borderRadius: 7,

    },
    followButtonText: {
      fontWeight: 'bold',
    },
  });
  
