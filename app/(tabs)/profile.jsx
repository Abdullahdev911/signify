import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '../../Context/themeContext'
import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router';

export default function Profile() {

  const {theme} = useTheme();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async ()=> {
     try {
          await signOut()
          router.replace('/')
        } catch (err) {
          console.error(JSON.stringify(err, null, 2))
        }
  }

  return (
        <View style={{backgroundColor:theme.background,flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color: theme.text}}>Profile</Text>
          <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign out</Text>
              </TouchableOpacity>
        </View>
  )
}