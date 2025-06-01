import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useTheme } from '../Context/themeContext.js';
import { Ionicons } from '@expo/vector-icons';

export default function GestureQuiz() {
  const { theme } = useTheme();
  const [data, setData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchGestures();
  }, []);

  const fetchGestures = async () => {
    try {
      const res = await fetch('https://ncejggvc0i.execute-api.eu-north-1.amazonaws.com/default/GetLetterMapping');
      const json = await res.json();
      setData(json.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      generateQuestions();
    }
  }, [data]);

  const generateQuestions = () => {
    const shuffled = [...data].sort(() => 0.5 - Math.random()).slice(0, 5);
    const q = shuffled.map((item) => {
      const incorrectOptions = [...data]
        .filter((d) => d.letter !== item.letter)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((d) => d.letter);

      const options = [...incorrectOptions, item.letter].sort(() => 0.5 - Math.random());

      return {
        imageUrl: item.imageUrl,
        correct: item.letter,
        options,
      };
    });
    setQuestions(q);
  };

  const handleAnswer = (answer) => {
    if (questions[current].correct === answer) {
      setScore((prev) => prev + 1);
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReplay = () => {
    setScore(0);
    setCurrent(0);
    setShowResult(false);
    generateQuestions();
  };

  if (questions.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Loading Quiz...</Text>
      </View>
    );
  }

  if (showResult) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.resultText, { color: theme.text }]}>Your Score: {score}/5</Text>
        <TouchableOpacity onPress={handleReplay} style={[styles.replayBtn, { backgroundColor: theme.primary }]}>
          <Ionicons name="refresh" size={20} color="white" />
          <Text style={styles.replayText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = questions[current];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Guess the Gesture</Text>
      <Text style={[styles.counter, { color: theme.text }]}>Question {current + 1} of 5</Text>

    <View style={styles.imageWrapper}>
        <Image source={{ uri: currentQuestion.imageUrl }} style={styles.gestureImage} />
    </View>


      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.optionBtn, { backgroundColor: theme.card, borderColor: theme.border }]}
            onPress={() => handleAnswer(opt)}
          >
            <Text style={[styles.optionText, { color: theme.text }]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'OpenSans',
  },
  counter: {
    marginBottom: 20,
    fontSize: 16,
  },
  gestureImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  imageWrapper: {
  width: 200,
  height: 160, 
  overflow: 'hidden',
  marginBottom: 24,
  borderRadius: 12,
},
  optionsContainer: {
    width: '100%',
  },
  optionBtn: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  replayBtn: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  replayText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
