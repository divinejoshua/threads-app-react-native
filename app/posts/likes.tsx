import { View, Text } from '../../components/Themed'
import React, { useContext, useEffect, useState } from 'react'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Link, Stack, useSearchParams } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { FlatList } from 'react-native-gesture-handler';
import useGetUsers from '../../utils/get-users';
import { ThreadContext } from '../../context/thread-context';
import UserItem from '../../components/UserItem';

export default function likedUsers() {
  // @ts-ignore: Unreachable code error
  const { id }  = useSearchParams() // get ID of the page from search params

  // Users from state 
  const {users, threads} = useContext(ThreadContext);

  //Data
  const [likesCount, setlikesCount] = useState<number>(0)

  // Get theme 
  const currentTheme = useColorScheme();
  const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
  const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
  const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor




    useEffect(() => {
      setlikesCount(threads.filter(post => post.id === id)[0].likesCount)
    })


  return (
    <View style={{backgroundColor: backgroundColor, flex: 1}}>
      <Stack.Screen options={{ title: likesCount+' likes'}} />
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
      />
    </View>
  )
}
