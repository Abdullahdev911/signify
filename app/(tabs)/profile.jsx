import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '../../Context/themeContext'


export default function Profile() {

  const {theme} = useTheme();

  return (
        <View style={{backgroundColor:theme.background,flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color: theme.text}}>Profile</Text>

    
        </View>
  )
}