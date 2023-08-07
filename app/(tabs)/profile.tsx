import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack, router } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, View } from '../../components/Themed';
import { useColorScheme, StyleSheet, Pressable, ListRenderItem, Dimensions } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Colors from '../../constants/Colors';
import { Image } from 'expo-image';


// Global variables
const HEADER_HEIGHT = 450
const PHOTOS_TAB = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const VIDEOS_TAB = [15,14,13,12,11,10,9,8,7,6,5,4]
const TAGS_TAB = [16,17,18,14,20,21,22,23,24,25]



// Top part of profile page 
const ProfileTop = () => {

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

    // Profile top 
    <View  pointerEvents="box-none" style={styles.container} >

      {/* Profile card view  */}
        {/* Profile card  */}
        <View pointerEvents="box-none" style={styles.profileCard}>

          {/* Profile Image  */}
          <View pointerEvents="none" style={[{ flex: 3, }]}>
            <Image 
              style={styles.profileImage}
              source={require('../../assets/images/profile.png')}
            />
          </View>

          {/* Profile stats  */}
          <View style={[{ flex: 7, }]} pointerEvents="box-none">
              <View style={styles.profileStats}>

              {/* Followers */}
              <View style={styles.centeredView} >
                  <Text style={styles.statsHeader}>Followers</Text>
                  <Text style={styles.statsText}>16.2M</Text>
              </View>

              {/* Followeing */}
              <View style={styles.centeredView} >
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
        <View style={{marginTop:20}} pointerEvents="none">

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

    )
}




// Main Parent Export
export default function  ProfileScreen () {

   // Get theme 
   const currentTheme = useColorScheme();
   const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
   const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
   const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor


  //  Image list component 
  const imageListItem: ListRenderItem<number> = React.useCallback(({ item,index }) => {

    const imageSize = Dimensions.get('window').width / 2 - 10;


    return (
      <View style={[styles.gridImageContainer,  { width: imageSize, height: imageSize }]}>
          <Image source={{ uri : `https://picsum.photos/500/300?image=${item * 5 + 10}`}} style={styles.gridImage} />
    </View>

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
                  <Feather  name="menu" size={18} color={textColor}/>
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
            containerStyle={{
              marginBottom:-35
            }}
            headerContainerStyle={{
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
              shadowOffset: {
                  width: 0, height: 0 // for iOS
              },
              backgroundColor:backgroundColor,
              borderBottomWidth:0.5,
              borderColor: borderColor,
              marginTop:-40,
            }}
            // This part targets the tabs header links
            renderTabBar={props => <MaterialTabBar {...props} 
                  indicatorStyle={{ backgroundColor:textColor, height:1}} 
                  activeColor ={textColor}
                  inactiveColor ="#999"
                  labelStyle={{
                    textTransform: "capitalize",
                    fontWeight:'600',
                  }}
                />}
                
            initialTabName="Photos" //Initial tab name to start from
          >

            {/* Photo tab  */}
            <Tabs.Tab 
              name="Photos" 
            // label={() =>  <Feather  name="menu" size={18} color={"#222"}/>}
            >
              <Tabs.FlatList
                data={PHOTOS_TAB}
                renderItem={imageListItem}
                numColumns={2}
                style={{
                  marginTop:-50,
                }}
              />
            </Tabs.Tab>



            {/* Video Tab  */}
            <Tabs.Tab name="Videos" >
                <Tabs.FlatList
                    data={VIDEOS_TAB}
                    renderItem={imageListItem}
                    numColumns={2}
                    style={{
                      marginTop:-50,
                    }}
                  />
            </Tabs.Tab>


            {/* Tagged Tab  */}
            <Tabs.Tab name="Tags">
                <Tabs.FlatList
                    data={TAGS_TAB}
                    renderItem={imageListItem}
                    numColumns={2}
                    style={{
                      marginTop:-50,
                    }}
                  />
            </Tabs.Tab>
          </Tabs.Container>
      </SafeAreaView>
  )
}




const styles = StyleSheet.create({
    container: {
        paddingLeft:20,
        paddingRight:20,
        paddingTop: 10,
        paddingBottom:20,
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
    },

    followingButton: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 7,
      flex:5,
      width: 100,
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
    
    gridImageContainer: {
      flex: 1,
      margin: 1,
    },
    gridImage: {
      flex: 1,
      width:'100%',
      height:'auto',
      borderRadius: 2,
    },

  });
  