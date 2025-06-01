import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../Context/themeContext.js';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const features = [
  {
    id: '1',
    title: 'Gesture-to-Speech/Text',
    description: 'Convert sign language to spoken or written words.',
    icon: 'hand-left-outline',
    screen: '/camera', 
  },
  {
    id: '2',
    title: 'Text-to-Gesture',
    description: 'Translate text into sign language gestures.',
    icon: 'text-outline',
    screen: '/search', 
  },
   {
    id: '3',
    title: 'Gesture Quiz',
    description: 'Test your knowledge of sign language gestures.',
    icon: 'help-circle-outline',
    screen: '/quiz',  
  },
];

export default function Home() {
  const { theme } = useTheme();
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={[{ backgroundColor: theme.background }, styles.container]}>
      <StatusBar style="auto" />

      <Text style={[{ color: theme.text }, styles.heading]}>
        Welcome , {user && user.firstName}
      </Text>
        {console.log(user)}

      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(item.screen)}
            style={[styles.card, { backgroundColor: theme.background,borderColor:theme.border,border:2}]}
          >
            <Ionicons name={item.icon} size={36} color={theme.text} style={styles.icon} />
            <View style={styles.textContainer}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.cardDescription, { color: theme.text }]}>
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
    borderWidth:1
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});
