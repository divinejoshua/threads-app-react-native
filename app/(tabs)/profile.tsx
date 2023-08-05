import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, View } from '../../components/Themed';
import { useColorScheme, StyleSheet, Pressable, ListRenderItem } from 'react-native';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Colors from '../../constants/Colors';
import { Image } from 'expo-image';


// Global variables
const HEADER_HEIGHT = 450
const DATA = [0, 1, 2, 3, 4]



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

    // Only vibrate when the user is following 
    if(isFollowing===false){
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }

  return (
    <>
    <View pointerEvents="box-none" style={styles.header}>
      <View style={{marginTop:100}}>
        
        {/* <TouchableOpacity style={{marginTop: 50, borderWidth:10}}>  */}
        <Link href="/search" style={{borderWidth:1, width:30}}><Text>Click</Text></Link>
        {/* </TouchableOpacity> */}

        {/* <TouchableOpacity style={{  marginTop: 80, borderWidth:10}}>  */}
        <Link href="/search" style={{}}><Text>Click</Text></Link>
        {/* </TouchableOpacity> */}

        {/* <TouchableOpacity style={{ marginTop: 80, borderWidth:10}}>  */}
        {/* <Link href="/search"><Text>Click</Text></Link> */}
        {/* </TouchableOpacity> */}

        </View>
    </View>

    </>
    )
}




// Main Parent Export
export default function  ProfileScreen () {

   // Get theme 
   const currentTheme = useColorScheme();
   const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
   const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
   const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor


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
            headerContainerStyle={{
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
              shadowOffset: {
                  width: 0, height: 0 // for iOS
              },
              borderBottomWidth:0.5,
              borderColor: borderColor,
              marginTop:-50,
             
            }}
            renderTabBar={props => <MaterialTabBar {...props} 
                indicatorStyle={{ backgroundColor:"#121212"}} 
                
                activeColor = "#121212"
                inactiveColor ="#bcbcbc"
                />}
            initialTabName="B" 
          >

            {/* Photo tab  */}
            <Tabs.Tab 
            name="List 1" 
            label={() =>  <Feather  name="menu" size={18} color={"#222"}/>}
            >
              {/* <Tabs.FlatList
                data={DATA}
                renderItem={imageListItem}
              /> */}

            <View style={[styles.box, styles.boxA]} />
                <View style={[styles.box, styles.boxB]} />
            </Tabs.Tab>

            {/* Video Tab  */}
            <Tabs.Tab name="B">
              <Tabs.ScrollView>
                <View style={[styles.box, styles.boxA]} />
                <View style={[styles.box, styles.boxB]} />
              </Tabs.ScrollView>
            </Tabs.Tab>


            {/* Tagged Tab  */}
            <Tabs.Tab name="C">
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
        marginTop: 10,
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
      marginTop:10, 
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
      padding:100,
      backgroundColor: '#2196f3',
    },
  });
  