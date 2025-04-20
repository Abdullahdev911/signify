import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useTheme } from '../Context/themeContext.js';
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const { theme } = useTheme();
  const router = useRouter();

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
          

      <TouchableOpacity style={[styles.googleBtn, { backgroundColor: theme.text }]}>
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
