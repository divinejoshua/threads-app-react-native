import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, View } from '../../components/Themed';
import { useColorScheme, StyleSheet, TouchableOpacity, Pressable, ListRenderItem } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Colors from '../../constants/Colors';
import { Image } from 'expo-image';


// Note: Docs on collasable tab view is found here :https://github.com/PedroBern/react-native-collapsible-tab-view

// Global variables
const HEADER_HEIGHT = 250
const DATA = [0, 1, 2, 3, 4]



// Top part of profile page 
const ProfileTop = () => {
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
        <View style={styles.container} pointerEvents='box-none'>
          {/* Main  */}
          
          {/* Profile card view  */}
          <View style={{}}>
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

        </View>
      )

}




// Main Parent Export
export default function  ProfileScreen () {

   // Get theme 
   const currentTheme = useColorScheme();
   const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
   const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
   const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor


  //  Image List 
  const imageListItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View><Text>{index}</Text></View>
    )
  }, [])

  
  return (
    <SafeAreaView  style={[{backgroundColor: backgroundColor, flex: 1}]} >

      {/* Stack screen  */}
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
                <Feather name="menu" size={18} color={textColor}/>
            </TouchableOpacity>

          ),
          headerBackTitleStyle: {
            fontSize:14
          },
        }} />
    
    


        {/* Tab container  */}
       
          <Tabs.Container
            renderHeader={ProfileTop}
            headerHeight={HEADER_HEIGHT} // optional
            allowHeaderOverscroll={true}
            headerContainerStyle={{
              backgroundColor:backgroundColor,
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
              shadowOffset: {
                  width: 0, height: 0 // for iOS
              },
              borderBottomWidth:.5,
              borderBottomColor:borderColor,
            }}
            renderTabBar={props => <MaterialTabBar {...props} 
                indicatorStyle={{ backgroundColor:textColor}} 
                activeColor = {textColor}
                inactiveColor = {borderColor}   
                labelStyle = {{
                  textTransform:'capitalize'
                }}
                />}
            initialTabName="Videos" 
          >

            {/* Photo tab  */}
            <Tabs.Tab 
              name="Photos" 
              label={() =>  <Feather  name="menu" size={18} color={textColor}/>}
            
            >
              <Tabs.FlatList
                data={DATA}
                renderItem={imageListItem}
              />
            </Tabs.Tab>

            {/* Video Tab  */}
            <Tabs.Tab name="Videos">
              <Tabs.ScrollView>
                <View style={[styles.box, styles.boxA]} />
                <View style={[styles.box, styles.boxB]} />
              </Tabs.ScrollView>
            </Tabs.Tab>


            {/* Tagged Tab  */}
            <Tabs.Tab name="Tags">
              <Tabs.ScrollView>
                <View style={[styles.box, styles.boxA]} />
                <View style={[styles.box, styles.boxB]} />
              </Tabs.ScrollView>
            </Tabs.Tab>
          </Tabs.Container>
      </SafeAreaView>
  )
}




const styles = StyleSheet.create({
    container: {
        paddingLeft:20,
        paddingRight:20,
        marginTop: -30,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        shadowOffset: {
            width: 0, height: 0 // for iOS
        },
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
      marginBottom:10,
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


    box: {
      height: 250,
      width: '100%',
    },
    boxA: {
      backgroundColor: 'white',
    },
    boxB: {
      backgroundColor: '#D8D8D8',
    },
    header: {
      height: HEADER_HEIGHT,
      width: '100%',
      backgroundColor: '#2196f3',
    },
  });
  