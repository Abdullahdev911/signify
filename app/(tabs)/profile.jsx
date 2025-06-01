import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../Context/themeContext';
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Profile() {
  const { theme } = useTheme();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const goToProfileInfo = () => {
    router.push('/profilePage'); 
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={goToProfileInfo}
      >
        <AntDesign name="user" size={20} color={'white'} style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Profile Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signOutButton]}
        onPress={handleSignOut}
      >
        <Ionicons name='log-out' size={20} color={'white'}  style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flexStart',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,

  },
  button: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent:'center',
    gap:4,
    width:'100%'
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    fontFamily:'OpenSans'
  },
  signOutButton: {
    backgroundColor: '#D9534F', // red accent
  },
});
