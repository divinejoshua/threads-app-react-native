import { View, Text } from '../components/Themed'
import React from 'react'
import EditScreenInfo from '../components/EditScreenInfo';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function likedUsers() {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>All likes will be displayed here</Text>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <EditScreenInfo path="app/likes" />
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

