import { View, Text } from '../../components/Themed'
import React from 'react'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Link } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

export default function likedUsers() {

    // Get theme 
    const currentTheme = useColorScheme();
    const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
    const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text
    const borderColor = currentTheme === "light" ? Colors.light.borderColor :Colors.dark.borderColor


  return (
    <SafeAreaView style={{backgroundColor: backgroundColor, flex: 1,}}>
      <Text>All likes will be displayed here</Text>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/likes" />
    </SafeAreaView>
  )
}
