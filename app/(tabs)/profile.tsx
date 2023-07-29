import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { Platform, useColorScheme, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default function  ProfileScreen () {
    // Get theme 
    const currentTheme = useColorScheme();
    const backgroundColor = currentTheme === "light" ? Colors.light.background :Colors.dark.background
    const textColor = currentTheme === "light" ? Colors.light.text :Colors.dark.text


  
  return (
    // Main 
    <SafeAreaView  style={[styles.container, {backgroundColor: backgroundColor, flex: 1,}]} >
        {/* Header text  */}
      <Text style={styles.title}>Profile</Text>

      {/* Scroll view  */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.select({ android: 30 }),
          paddingHorizontal: 15,
          marginTop: 10
        }}
      >
    </ScrollView>
    </SafeAreaView>
  )
}




const styles = StyleSheet.create({
    container: {
        paddingTop:20,
        paddingLeft:20,
        paddingRight:20,
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
  });
  