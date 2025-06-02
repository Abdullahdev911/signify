import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../Context/themeContext';

export default function AskASLScreen() {
  const { theme } = useTheme();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const askGemini = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert ASL tutor. Answer clearly and helpfully: ${question}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const json = await res.json();
      const content = json.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnswer(content || 'Sorry, I couldn’t answer that.');
      setHistory((prev) => [...prev, { q: question, a: content }]);
    } catch (err) {
      setAnswer('Error reaching Gemini. Please try again.');
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={[styles.title, { color: theme.text }]}>Ask-ASL Chat</Text>

      <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 30 }}>
        {history.map((item, index) => (
          <View key={index} style={styles.chatItem}>
            <Text style={[styles.userQ, { color: theme.primary }]}>Q: {item.q}</Text>
            <Text style={[styles.botA, { color: theme.text }]}>A: {item.a}</Text>
          </View>
        ))}

        {loading && (
          <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
        )}

        {!loading && answer && (
          <View style={styles.chatItem}>
            <Text style={[styles.botA, { color: theme.text }]}>A: {answer}</Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.inputRow, { borderColor: theme.border }]}>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Ask a question about ASL..."
          placeholderTextColor={theme.text}
          value={question}
          onChangeText={setQuestion}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={askGemini}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'OpenSans',
    marginBottom: 16,
    textAlign: 'center',
  },
  chatArea: {
    flex: 1,
  },
  chatItem: {
    marginBottom: 16,
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  userQ: {
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'OpenSans',
  },
  botA: {
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    fontFamily: 'OpenSans',
    paddingHorizontal: 12,
  },
  sendBtn: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
});
