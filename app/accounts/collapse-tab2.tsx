  // // Get theme 
  // const currentTheme = useColorScheme();
  // const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
  // const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
  // const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor


  // const [isFollowing, setisFollowing] = useState<Boolean>(false)

  // // follow user / unfollow user 
  // const followUser = () =>{
  //   setisFollowing((prevIsLiked) => !prevIsLiked);

  //   // Only vibrate when the user is following 
  //   if(isFollowing===false){
  //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  //   }
  // }


  
  // return (
  //   // Profile top 
  //   <View pointerEvents="none" style={styles.container} >

  //     {/* Profile card view  */}
  //       {/* Profile card  */}
  //       <View style={styles.profileCard}>

  //         {/* Profile Image  */}
  //         <View style={[{ flex: 3, }]}>
  //           <Image 
  //             style={styles.profileImage}
  //             source={require('../../assets/images/profile.png')}
  //           />
  //         </View>

  //         {/* Profile stats  */}
  //         <View style={[{ flex: 7, }]}>
  //             <View style={styles.profileStats}>

  //             {/* Followers */}
  //             <View style={styles.centeredView}>
  //                 <Link href="/accounts/collapsible-tab"><Text style={styles.statsHeader}>Followers</Text></Link>
  //                <Text style={styles.statsText}>16.2M</Text>
  //             </View>

  //             {/* Followeing */}
  //             <View style={styles.centeredView}>
  //             <Link href="/accounts/collapse-tab2"><Text style={styles.statsHeader}>Following</Text></Link>
  //                <Text style={styles.statsText}>1,324</Text>
  //             </View>

  //             {/* Posts */}
  //             <View style={styles.centeredView}>
  //               <Text style={styles.statsHeader}>Posts</Text>
  //                <Text style={styles.statsText}>10.1K</Text>
  //             </View>
  //             </View>
  //         </View>

  //       </View>


  //   {/* User Info */}
  //       <View style={{marginTop:20}}>

  //           {/* Full name  */}
  //           <Text style={{fontSize: 17, fontWeight:'600', }}>Eren Yeager <MaterialIcons name="verified" size={14} color="#60a5fa" /></Text> 

  //           {/* Username  */}
  //           <Text style={{marginTop:5, color:'#aaaaaa', }}>@yeager</Text>

  //           {/* Bio  */}
  //           <Text style={{marginTop:5, lineHeight:23, letterSpacing:.1 }}>
  //               𝐸𝓈𝓉. 1894 ❤️ Love This City! 🏆 x1 UCL winners, 9x League champions, x1 WSL champions | 💬 Fan support: <Text style={{color:'#60a5fa'}}>@wetroverse</Text>
  //           </Text>
  //       </View>

  //   {/* Action buttons  */}

  //       <View style={styles.actionButtons}>
  
  //         {/* If following  */}
  //         {isFollowing ?
  
  //           //  If is following  
  //           <TouchableOpacity onPress={()=> followUser()}  style={[styles.followingButton, {borderColor: borderColor}]}>
  //             <Text style={styles.followButtonText}>Following</Text>
  //           </TouchableOpacity>
  //           :
  //           // If logged in user is not following
  //           <TouchableOpacity onPress={()=> followUser()} style={[styles.followButton, {backgroundColor: "#3b82f6"}]}>
  //               <Text style={[styles.followButtonText,{color:"#fff"}]}>Follow</Text>
  //           </TouchableOpacity>
  //         }
  
  //         {/* Message button  */}
  //         <Pressable style={[styles.followingButton, {borderColor: borderColor}]}>
  //           <Text style={{fontWeight:'600'}}>Message</Text>
  //         </Pressable>
  
  //       </View>
  
  

  //   </View>






  ////////////////////////////////////////////////////////////////


//   <View pointerEvents="box-none" style={styles.header}>
//   <View pointerEvents="box-none" style={{marginTop:100}}>
//   <View pointerEvents="none" style={{marginTop:100}}><Text>The</Text></View>
  
//     <Link href="/search" style={{borderWidth:1, width:30}}><Text>Click</Text></Link>
    
//     </View>
// </View>