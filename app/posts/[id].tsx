import { Stack, useSearchParams } from 'expo-router'
import { View, Text } from '../../components/Themed'
import React from 'react'

const postDetails = () => {
   // @ts-ignore: Unreachable code error
  const { id }  = useSearchParams()
  return (
    <View>
      <Stack.Screen options={{ title: `Thread #${id}`}} />
      <Text>postDetails</Text>
    </View>
  )
}

export default postDetails