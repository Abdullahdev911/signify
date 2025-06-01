import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
import { useTheme } from '../Context/themeContext.js';
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useSSO } from '@clerk/clerk-expo'
import { useCallback } from "react";
import * as AuthSession from 'expo-auth-session';


export default function Index() {
  const {isSignedIn,isLoaded} = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const { startSSOFlow } = useSSO()
  
 const onPress = useCallback(async () => {
  try {
    const redirectUrl = AuthSession.makeRedirectUri({ native: 'signify://',useProxy: true});
    console.log('Redirect URL:', redirectUrl);

    const { createdSessionId, setActive } = await startSSOFlow({
      strategy: 'oauth_google',
      // redirectUrl,
    });

    console.log('Session ID:', createdSessionId);

    if (createdSessionId) {
      await setActive({ session: createdSessionId });
      console.log('Session active, navigating...');
      router.replace('/home');
    } else {
      console.warn('No session ID returned');
    }
  } catch (err) {
    console.error('SSO Error:', err);
  }
}, []);


  if (!isLoaded){
    return null;
  } 

  if(isSignedIn){
      return <Redirect href={'/(tabs)/home'}/>
    }


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={require('../assets/images/Signify-logo.png')}
        style={styles.logo}
      />

      <Text style={[styles.tagline, { color: theme.text }]}>
         Empowering silent voices through real-time gesture recognition 
      </Text>

      <Image
        source={require('../assets/images/Discussion-bro.png')}
        style={styles.heroImage}
      />
      
          
      <TouchableOpacity style={[styles.emailBtn, { backgroundColor: theme.primary }]} onPress={()=> router.push('/sign-up')}>
        <Ionicons name='mail' color={theme.background} size={20} style={styles.icon} />
        <Text style={[styles.emailText, { color: theme.background }]}>
          Continue With Email
          </Text>
      </TouchableOpacity>
          

      <TouchableOpacity style={[styles.googleBtn, { backgroundColor: theme.text }]} onPress={onPress}>
        <Ionicons name="logo-google" color={theme.background} size={20} style={styles.icon} />
        <Text style={[styles.googleText, { color: theme.background }]}>Continue With Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical:10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width:200,
    height:100,
    resizeMode:'cover',
    alignSelf: 'flex-start',
  },
  tagline: {
    fontWeight: '600',
    fontFamily: 'OpenSans',
    fontSize: 24,
    textAlign: 'left',
    marginTop: 10,

  },
  heroImage: {
    height: '45%',
    width: '100%',
    resizeMode: "contain",
    marginVertical: 5,
  },
  emailBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  emailText: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
    fontFamily:'OpenSans'
  },
  googleBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleText: {
    fontWeight: '600',
    fontFamily: 'OpenSans',
    fontSize: 16,
    marginLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
});
