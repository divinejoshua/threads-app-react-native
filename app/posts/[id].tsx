import { Stack, useSearchParams } from 'expo-router'
import { View, Text } from '../../components/Themed'
import React, { useContext, useEffect, useState } from 'react'
import { Thread } from '../../types/threads';
import { ThreadContext } from '../../context/thread-context';



export default function PostItem(): JSX.Element {
   // @ts-ignore: Unreachable code error
  const { id }  = useSearchParams()

  const threads = useContext(ThreadContext);

  // Set the post thread
  const [postThread, setpostThread] = useState({})

  useEffect(() => {
    // Set loading to true 
    setpostThread(threads.filter(post => post.id === id)[0])
    console.log(threads.filter(post => post.id === id)[0].author.name)
  }, []);


  return (
    <View>
      <Stack.Screen options={{ title: 'Thread'}} />
      <Text>postDetails {id}</Text>
    </View>
  )
}
