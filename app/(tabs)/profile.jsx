import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'


export default function Profile() {
  return (
        <View style={{backgroundColor:'black',flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'white'}}>Profile</Text>
            <StatusBar style="light" backgroundColor="#000" />
    
        </View>
  )
}