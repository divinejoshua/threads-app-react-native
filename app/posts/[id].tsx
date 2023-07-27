import { Stack, useSearchParams } from 'expo-router'
import { View, Text } from '../../components/Themed'
import React from 'react'

const postDetails = () => {
  const { id }  = useSearchParams()
  return (

   
    <View>
      <Stack.Screen options={{ title: `Thread #${Postid}`, presentation: 'modal'  }} />
      <Text>postDetails</Text>
    </View>

  )
}

export default postDetails