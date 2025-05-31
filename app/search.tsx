import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useTheme } from '../Context/themeContext.js';
import { Ionicons } from '@expo/vector-icons';

export default function Search() {
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [slideshowImages, setSlideshowImages] = useState([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ncejggvc0i.execute-api.eu-north-1.amazonaws.com/default/GetLetterMapping');
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInput = (text) => {
    if (text.length <= 10) {
      setInput(text);
      updateCards(text);
    }
  };

  const updateCards = (word) => {
    const updated = word
      .toUpperCase()
      .split('')
      .map((char) => data.find((item) => item.letter === char))
      .filter(Boolean);
    setFilteredImages(updated);
    setSlideshowImages([]); // Reset slideshow
  };

  const startSlideshow = async () => {
    setFilteredImages([]); // Clear cards
    setPlaying(true);
    for (let i = 0; i < input.length; i++) {
      const letter = input[i].toUpperCase();
      const item = data.find((d) => d.letter === letter);
      if (item) {
        setSlideshowImages([item]);
        await new Promise((res) => setTimeout(res, 1000));
      }
    }
    setPlaying(false);
  };

  return (
    <View style={[{ backgroundColor: theme.background }, styles.container]}>
      {/* Heading */}
      <View style={styles.headingContainer}>
        <Ionicons name={'hand-left-sharp'} size={26} color={theme.text} style={styles.icon} />
        <Text style={[{ color: theme.text }, styles.heading]}>Text-to-Gesture</Text>
      </View>

      {/* Searchbar */}
      <TextInput
        placeholder="Search for words..."
        style={[
          {
            color: theme.text,
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
          styles.searchbar,
        ]}
        placeholderTextColor={theme.text}
        value={input}
        onChangeText={handleInput}
      />

      {/* Cards */}
      {
        !playing && 
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardRow}>
        {filteredImages.map((item, index) => (
          <View key={index} style={[styles.card, { backgroundColor: theme.card }]}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            {/* <Text style={[{ color: theme.text }, styles.cardText]}>{item.letter}</Text> */}
          </View>
        ))}
      </ScrollView>
      }

      {/* Slideshow Display */}
      
    {slideshowImages.length > 0 && (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Image source={{ uri: slideshowImages[0].imageUrl }} style={styles.cardImage} />
        </View>
        <TouchableOpacity onPress={() => { setSlideshowImages([]); setPlaying(false); }} style={[styles.cancelBtn, { backgroundColor: theme.primary }]}>
          <Ionicons name="close" size={20} color="white" />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    )}


      {/* Play Button */}
      {filteredImages.length > 0 && !playing && slideshowImages.length === 0 && (
        <TouchableOpacity onPress={startSlideshow} style={[styles.playBtn, { backgroundColor: theme.primary }]}>
          <Ionicons name="play" size={24} color="white" />
          <Text style={styles.playText}>Play</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  icon: {
    marginRight: 15,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbar: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 24,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
  cardRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  card: {
    width: 120,
    height: 140,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    elevation: 2,
  },
  cancelBtn: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    marginLeft: 6,
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  cardText: {
    marginTop: 6,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
  },
  playBtn: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  playText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
