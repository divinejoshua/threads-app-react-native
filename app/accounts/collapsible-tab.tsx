import { View, Text } from '../../components/Themed'
import React from 'react'
import { StyleSheet, ListRenderItem } from 'react-native'
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';


const HEADER_HEIGHT = 250

const DATA = [0, 1, 2, 3, 4]
const identity = (v: unknown): string => v + ''

const Header = () => {
  return <View style={styles.header}><Text>GOt here</Text></View>
}

const Example: React.FC = () => {
  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]}><Text>Not sure</Text></View>
    )
  }, [])

  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT} // optional
      renderTabBar={props => <MaterialTabBar {...props} 
          indicatorStyle={{ backgroundColor: 'red', maxWidth:5, height:5,borderRadius:100, left:'16%' }} 
          
          activeColor = "red"
          inactiveColor ="green"
          />}
      initialTabName="B" 
    >
      <Tabs.Tab 
      name="List 1" 
      label={() =>  <Feather  name="menu" size={18} color={"#222"}/>}
      >
        <Tabs.FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={identity}
        />
      </Tabs.Tab>
      <Tabs.Tab name="B">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="C">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: '#2196f3',
  },
})

export default Example
