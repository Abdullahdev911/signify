import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../Context/themeContext';
import {  useUser } from '@clerk/clerk-expo';

export default function ProfileInfo() {
  const { theme } = useTheme();
  const {user} = useUser();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image
        source={{ uri: user.imageUrl }}
        style={styles.profileImage}
        resizeMode="cover"
      />
      <Text style={[styles.name, { color: theme.text }]}>
        {user.fullName || `${user.firstName} ${user.lastName}`}
      </Text>

      <Text style={[styles.label, { color: theme.text }]}>Email</Text>
      <Text style={[styles.info, { color: theme.text }]}>
        {user.primaryEmailAddress?.emailAddress || 'No email'}
      </Text>

      <Text style={[styles.label, { color: theme.text }]}>Account Created</Text>
      <Text style={[styles.info, { color: theme.text }]}>
        {new Date(user.createdAt).toDateString()}
      </Text>

      <Text style={[styles.label, { color: theme.text }]}>Last Sign In</Text>
      <Text style={[styles.info, { color: theme.text }]}>
        {new Date(user.lastSignInAt).toLocaleString()}
      </Text>

      <Text style={[styles.label, { color: theme.text }]}>Two-Factor Authentication</Text>
      <Text style={[styles.info, { color: theme.text }]}>
        {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#888',
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
});
