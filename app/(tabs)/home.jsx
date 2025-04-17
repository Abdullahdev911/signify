import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../../Context/themeContext.js'

export default function Home() {

  const {theme} = useTheme();

  return (
    <View style={{backgroundColor:theme.background,flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:theme.text}}>home</Text>
    </View>
  )
}